/**
 * @file problemController.js
 * @description Controller for managing technical problems and debugging challenges.
 * Handles problem lifecycle, category filtering, and community voting.
 */

const Problem = require('../models/Problem');
const Solution = require('../models/Solution');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { getEvolutionStage, updateContributionStreak } = require('../utils/gamification');

/**
 * @desc    Fetch a list of problems with support for filtering by priority/category 
 *          and dynamic sorting (newest, popular, views).
 * @route   GET /api/problems
 */
exports.getProblems = async (req, res) => {
    try {
        const { category, priority, status, sort, search } = req.query;
        let query = {};

        // Apply filters if provided in the query parameters
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

        // Apply sorting preferences
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

/**
 * @desc    Retrieve a single problem detail including linked solutions and author metrics.
 * @route   GET /api/problems/:id
 */
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

        // Increment internal engagement views
        problem.views += 1;
        await problem.save();

        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problem', error: error.message });
    }
};

/**
 * @desc    Submit a new technical challenge. 
 *          Includes mandatory AI moderation and gamification point awarding.
 * @route   POST /api/problems
 */
exports.createProblem = async (req, res) => {
    try {
        const { title, description, category, tags, priority } = req.body;

        // Security Layer: Moderate problem description for technical safety and toxicity
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

        // Award points for seeding new technical knowledge challenges
        const creator = await User.findById(req.user._id);
        if (creator) {
            creator.reputationPoints += 30;
            creator.evolutionStage = getEvolutionStage(creator.reputationPoints);

            // Track contribution streak
            updateContributionStreak(creator);

            await creator.save();
        }

        res.status(201).json(problem);
    } catch (error) {
        console.error('Create Problem Error:', error);
        res.status(500).json({ message: 'Error creating problem', error: error.message });
    }
};

/**
 * @desc    Registers a community vote (up/down) on a problem.
 * @route   PUT /api/problems/:id/vote
 */
exports.voteProblem = async (req, res) => {
    try {
        const { type } = req.body; // Expects 'upvote' or 'downvote'
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
