const User = require('../models/User');
const Problem = require('../models/Problem');
const Article = require('../models/Article');

// @desc    Get user profile with their contributions
// @route   GET /api/users/profile/:id
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
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

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.find()
            .sort('-reputation')
            .limit(50)
            .select('name avatar level reputation problemsSolved articlesWritten badges');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
    }
};

// @desc    Get user stats for dashboard
// @route   GET /api/users/stats
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const problemCount = await Problem.countDocuments({ author: userId });
        const solvedCount = await Problem.countDocuments({ author: userId, status: 'solved' });
        const articleCount = await Article.countDocuments({ author: userId });

        // Mocking some trends and recent activity handles
        const user = await User.findById(userId).select('reputation level streak');

        res.status(200).json({
            stats: {
                problemsPosted: problemCount,
                problemsSolved: solvedCount,
                articlesWritten: articleCount,
                reputation: user.reputation,
                level: user.level,
                streak: user.streak
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
