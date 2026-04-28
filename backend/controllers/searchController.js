const Problem = require('../models/Problem');
const Article = require('../models/Article');

// @desc    Global search across problems and articles
// @route   GET /api/search
exports.globalSearch = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(200).json({ problems: [], articles: [] });
        }

        const searchRegex = { $regex: q, $options: 'i' };

        const problems = await Problem.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { tags: searchRegex }
            ]
        }).populate('author', 'name avatar').limit(10);

        const articles = await Article.find({
            $or: [
                { title: searchRegex },
                { content: searchRegex },
                { excerpt: searchRegex },
                { tags: searchRegex }
            ]
        }).populate('author', 'name avatar').limit(10);

        res.status(200).json({ problems, articles });
    } catch (error) {
        res.status(500).json({ message: 'Search error', error: error.message });
    }
};
