const express = require('express');
const router = express.Router();
const { getArticles, createArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.post('/', createArticle);

module.exports = router;
