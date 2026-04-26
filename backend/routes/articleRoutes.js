const express = require('express');
const router = express.Router();
const {
    getArticles,
    createArticle,
    getArticleById,
    likeArticle,
    summarizeArticle,
    getArticleGraph,
    analyzeDraft
} = require('../controllers/articleController');
const { protect } = require('../middleware/auth');

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id/like', protect, likeArticle);
router.post('/:id/summarize', protect, summarizeArticle);
router.get('/stats/graph', getArticleGraph);
router.post('/analyze-draft', protect, analyzeDraft);

module.exports = router;
