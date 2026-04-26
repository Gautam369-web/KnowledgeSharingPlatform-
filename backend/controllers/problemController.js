const Problem = require('../models/Problem');
const Solution = require('../models/Solution');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { getEvolutionStage } = require('../utils/gamification');

// @desc    Get all problems with filtering and sorting
// @route   GET /api/problems
exports.getProblems = async (req, res) => {
    try {
        const { category, priority, status, sort, search } = req.query;
        let query = {};

        // Filtering
        if (category) query.category = category;
        if (priority) query.priority = priority;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let result = Problem.find(query).populate('author', 'name avatar level');

        // Sorting
        if (sort === 'newest') {
            result = result.sort('-createdAt');
        } else if (sort === 'oldest') {
            result = result.sort('createdAt');
        } else if (sort === 'popular') {
            result = result.sort('-upvotes');
        } else if (sort === 'views') {
            result = result.sort('-views');
        } else {
            result = result.sort('-createdAt');
        }

        const problems = await result;
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problems', error: error.message });
    }
};

// @desc    Get single problem by ID
// @route   GET /api/problems/:id
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate('author', 'name avatar level reputation bio')
            .populate({
                path: 'solutions',
                populate: { path: 'author', select: 'name avatar level reputation' }
            });

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Increment views
        problem.views += 1;
        await problem.save();

        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problem', error: error.message });
    }
};

// @desc    Create a new problem
// @route   POST /api/problems
exports.createProblem = async (req, res) => {
    try {
        const { title, description, category, tags, priority } = req.body;

        // AI Moderation Check
        const moderationResult = await scanContent(`${title} ${description}`);
        if (!moderationResult.isSafe) {
            const user = await User.findById(req.user._id);
            await sendModerationWarning(user.email, description, moderationResult.detected);
            return res.status(400).json({
                message: 'Inappropriate content detected. Post blocked and security warning dispatched.',
                detected: moderationResult.detected
            });
        }

        const problem = await Problem.create({
            title,
            description,
            category,
            tags,
            priority,
            author: req.user._id
        });

        await User.findByIdAndUpdate(req.user._id, {
            $inc: { problemsSolved: 1, reputation: 10 }
        });

        // Reward user for contributing a challenge
        const creator = await User.findById(req.user._id);
        if (creator) {
            creator.reputationPoints += 30;
            creator.evolutionStage = getEvolutionStage(creator.reputationPoints);
            await creator.save();
        }

        res.status(201).json(problem);
    } catch (error) {
        console.error('Create Problem Error:', error);
        res.status(500).json({ message: 'Error creating problem', error: error.message });
    }
};

// @desc    Vote on a problem
// @route   PUT /api/problems/:id/vote
exports.voteProblem = async (req, res) => {
    try {
        const { type } = req.body; // 'upvote' or 'downvote'
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        if (type === 'upvote') {
            problem.upvotes += 1;
        } else if (type === 'downvote') {
            problem.downvotes += 1;
        }

        await problem.save();
        res.status(200).json({ upvotes: problem.upvotes, downvotes: problem.downvotes });
    } catch (error) {
        res.status(500).json({ message: 'Error voting', error: error.message });
    }
};
