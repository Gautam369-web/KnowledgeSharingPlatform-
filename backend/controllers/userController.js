/**
 * @file userController.js
 * @description Controller for managing user profiles, high-fidelity stats, and the Council Leaderboard.
 */

const User = require('../models/User');
const Problem = require('../models/Problem');
const Article = require('../models/Article');

/**
 * @desc    Fetch a public user profile along with their technical contributions.
 * @route   GET /api/users/profile/:id
 */
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Aggregate user contributions (Articles + Problems)
        const problems = await Problem.find({ author: user._id }).sort('-createdAt');
        const articles = await Article.find({ author: user._id }).sort('-createdAt');

        res.status(200).json({
            user,
            problems,
            articles
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

/**
 * @desc    Update the authenticated user's profile metadata.
 * @route   PUT /api/users/profile
 */
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Apply partial updates from request body
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.location = req.body.location || user.location;
            user.website = req.body.website || user.website;
            user.github = req.body.github || user.github;
            user.avatar = req.body.avatar || user.avatar;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

/**
 * @desc    Fetch the high-reputation "Council" leaderboard.
 *          Sorted by reputation points and contribution volume.
 * @route   GET /api/users/leaderboard
 */
exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ reputationPoints: -1, articlesWritten: -1, problemsSolved: -1 })
            .limit(50)
            .select('name avatar level reputation reputationPoints evolutionStage specialization problemsSolved articlesWritten badges');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
    }
};

/**
 * @desc    Fetch personalized technical stats for the user's Solarpunk dashboard.
 * @route   GET /api/users/stats
 */
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Parallel count of technical activity
        const problemCount = await Problem.countDocuments({ author: userId });
        const solvedCount = await Problem.countDocuments({ author: userId, status: 'solved' });
        const articleCount = await Article.countDocuments({ author: userId });

        // Retrieve deep gamification metrics
        const user = await User.findById(userId).select('reputation reputationPoints evolutionStage specialization level streak');

        res.status(200).json({
            stats: {
                problemsPosted: problemCount,
                problemsSolved: solvedCount,
                articlesWritten: articleCount,
                reputation: user.reputation,
                reputationPoints: user.reputationPoints,
                level: user.level,
                evolutionStage: user.evolutionStage,
                streak: user.streak
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

/**
 * @desc    Follow another user
 * @route   POST /api/users/follow/:id
 */
exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userToFollow._id.toString() === currentUser._id.toString()) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        // Check if already following
        if (currentUser.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        // Add to following
        currentUser.following.push(userToFollow._id);
        // Add to followers
        userToFollow.followers.push(currentUser._id);

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({ message: 'Successfully followed user' });
    } catch (error) {
        res.status(500).json({ message: 'Error following user', error: error.message });
    }
};

/**
 * @desc    Unfollow a user
 * @route   POST /api/users/unfollow/:id
 */
exports.unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove from following
        currentUser.following = currentUser.following.filter(
            id => id.toString() !== userToUnfollow._id.toString()
        );
        // Remove from followers
        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== currentUser._id.toString()
        );

        await currentUser.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'Successfully unfollowed user' });
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing user', error: error.message });
    }
};

/**
 * @desc    Fetch global ecosystem statistics for the landing page.
 * @route   GET /api/users/global-stats
 */
exports.getGlobalStats = async (req, res) => {
    try {
        const [problemCount, expertCount, articleCount] = await Promise.all([
            Problem.countDocuments(),
            User.countDocuments({ reputationPoints: { $gt: 0 } }),
            Article.countDocuments({ status: 'published' })
        ]);

        res.status(200).json({
            problemsSolved: problemCount,
            activeExperts: expertCount || 1, // Fallback for fresh instances
            knowledgeArticles: articleCount,
            uptime: '99.9%' // Static SLA
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching global statistics', error: error.message });
    }
};
