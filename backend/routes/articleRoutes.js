const express = require('express');
const router = express.Router();
const {
    getArticles,
    createArticle,
    getArticleById,
    likeArticle
} = require('../controllers/articleController');
const { protect } = require('../middleware/auth');

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id/like', protect, likeArticle);

module.exports = router;
