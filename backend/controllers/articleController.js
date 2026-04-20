const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'name avatar');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error: error.message });
    }
};
