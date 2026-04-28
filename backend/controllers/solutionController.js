/**
 * @file solutionController.js
 * @description Controller for managing peer-provided solutions to technical problems.
 * Handles solution submission, AI moderation, community voting, and acceptance.
 */

const Solution = require('../models/Solution');
const Problem = require('../models/Problem');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { getEvolutionStage, updateContributionStreak } = require('../utils/gamification');

/**
 * @desc    Propose a solution to a specific technical problem.
 *          Involves security scanning and reputation point awarding for contributors.
 * @route   POST /api/solutions/:problemId
 */
exports.addSolution = async (req, res) => {
    try {
        const { content } = req.body;
        const problem = await Problem.findById(req.params.problemId);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Security Layer: Moderate solution content to prevent malicious scripts or toxicity
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

        // Register the solution with the parent problem record
        problem.solutions.push(solution._id);
        await problem.save();

        // Award reputation to the solver for contributing technical intelligence
        const solver = await User.findById(req.user._id);
        if (solver) {
            solver.reputationPoints += 20;
            solver.evolutionStage = getEvolutionStage(solver.reputationPoints);

            // Track contribution streak
            updateContributionStreak(solver);

            await solver.save();
        }

        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ message: 'Error adding solution', error: error.message });
    }
};

/**
 * @desc    Registers a community vote on a specific solution.
 * @route   PUT /api/solutions/:id/vote
 */
exports.voteSolution = async (req, res) => {
    try {
        const { type } = req.body; // Expects 'upvote' or 'downvote'
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

/**
 * @desc    Allows the original problem author to accept a solution as valid.
 *          Updates problem status to 'solved'.
 * @route   PUT /api/solutions/:id/accept
 */
exports.acceptSolution = async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id).populate('problemId');

        if (!solution) {
            return res.status(404).json({ message: 'Solution not found' });
        }

        // Authorization check: Only the problem's creator can accept a solution
        if (solution.problemId.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to accept this solution' });
        }

        solution.isAccepted = true;
        await solution.save();

        // Transactional update: Mark parent problem as solved
        const problem = await Problem.findById(solution.problemId);
        problem.status = 'solved';
        await problem.save();

        res.status(200).json({ message: 'Solution accepted', solution });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting solution', error: error.message });
    }
};
