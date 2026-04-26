const Solution = require('../models/Solution');
const Problem = require('../models/Problem');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { getEvolutionStage } = require('../utils/gamification');

// @desc    Add a solution to a problem
// @route   POST /api/solutions/:problemId
exports.addSolution = async (req, res) => {
    try {
        const { content } = req.body;
        const problem = await Problem.findById(req.params.problemId);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // AI Moderation Check
        const moderationResult = await scanContent(content);
        if (!moderationResult.isSafe) {
            const user = await User.findById(req.user._id);
            await sendModerationWarning(user.email, content, moderationResult.detected);
            return res.status(400).json({
                message: 'AI moderation triggered: Inappropriate content blocked.',
                detected: moderationResult.detected
            });
        }

        const solution = await Solution.create({
            content,
            author: req.user._id,
            problemId: req.params.problemId
        });

        // Add solution to problem's solutions array
        problem.solutions.push(solution._id);
        await problem.save();

        // Reward user for providing a potential intelligence node
        const solver = await User.findById(req.user._id);
        if (solver) {
            solver.reputationPoints += 20;
            solver.evolutionStage = getEvolutionStage(solver.reputationPoints);
            await solver.save();
        }

        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ message: 'Error adding solution', error: error.message });
    }
};

// @desc    Vote on a solution
// @route   PUT /api/solutions/:id/vote
exports.voteSolution = async (req, res) => {
    try {
        const { type } = req.body; // 'upvote' or 'downvote'
        const solution = await Solution.findById(req.params.id);

        if (!solution) {
            return res.status(404).json({ message: 'Solution not found' });
        }

        if (type === 'upvote') {
            solution.upvotes += 1;
        } else if (type === 'downvote') {
            solution.downvotes += 1;
        }

        await solution.save();
        res.status(200).json({ upvotes: solution.upvotes, downvotes: solution.downvotes });
    } catch (error) {
        res.status(500).json({ message: 'Error voting', error: error.message });
    }
};

// @desc    Mark solution as accepted
// @route   PUT /api/solutions/:id/accept
exports.acceptSolution = async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id).populate('problemId');

        if (!solution) {
            return res.status(404).json({ message: 'Solution not found' });
        }

        // Verify that the user is the author of the problem
        if (solution.problemId.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to accept this solution' });
        }

        solution.isAccepted = true;
        await solution.save();

        // Also update problem status if needed
        const problem = await Problem.findById(solution.problemId);
        problem.status = 'solved';
        await problem.save();

        res.status(200).json({ message: 'Solution accepted', solution });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting solution', error: error.message });
    }
};
