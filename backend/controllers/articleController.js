/**
 * @file articleController.js
 * @description Controller for managing long-form technical articles.
 * Includes AI-assisted drafting, semantic moderation, and gamification hooks.
 */

const Article = require('../models/Article');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { generateSummary } = require('../utils/aiSummarizer');
const { getEvolutionStage } = require('../utils/gamification');
const { analyzeDraft } = require('../utils/draftSentinel');

/**
 * @desc    Fetch a paginated list of articles with search and category filters.
 * @route   GET /api/articles
 */
exports.getArticles = async (req, res) => {
    try {
        const { category, search, sort, status } = req.query;
        // Default to showing only published articles
        let query = { status: status || { $in: ['published', undefined] } };

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        let result = Article.find(query).populate('author', 'name avatar level');

        // Dynamic sorting logic based on popularity or chronicity
        if (sort === 'popular') {
            result = result.sort('-likes');
        } else if (sort === 'oldest') {
            result = result.sort('createdAt');
        } else {
            result = result.sort('-createdAt');
        }

        const articles = await result;
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};

/**
 * @desc    Fetch full details for a single article and increment view metrics.
 * @route   GET /api/articles/:id
 */
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'name avatar bio level reputation');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment internal engagement metrics
        article.views += 1;
        await article.save();

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
};

/**
 * @desc    Generates relational data for the interactive IQ Web topology.
 * @route   GET /api/articles/stats/graph
 */
exports.getArticleGraph = async (req, res) => {
    try {
        const articles = await Article.find({}, 'category tags');

        const nodesMap = {};
        const linksSet = new Set();

        // Algorithmic mapping of categories to tags to build a neural knowledge mesh
        articles.forEach(article => {
            const cat = article.category || 'Uncategorized';
            if (!nodesMap[cat]) {
                nodesMap[cat] = { id: cat, val: 1, group: 1 }; // High-level node
            } else {
                nodesMap[cat].val += 1;
            }

            article.tags?.forEach(tag => {
                if (!nodesMap[tag]) {
                    nodesMap[tag] = { id: tag, val: 0.5, group: 2 }; // Detail node
                }
                const linkKey = [cat, tag].sort().join('->');
                linksSet.add(linkKey);
            });
        });

        const nodes = Object.values(nodesMap);
        const links = Array.from(linksSet).map(key => {
            const [source, target] = key.split('->');
            return { source, target };
        });

        res.status(200).json({ nodes, links });
    } catch (error) {
        res.status(500).json({ message: 'Error generating graph', error: error.message });
    }
};

/**
 * @desc    Publish or save a new contributing article.
 *          Involves security scanning and user evolution triggering.
 * @route   POST /api/articles
 */
exports.createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, category, tags, coverImage, readTime, status } = req.body;

        // LAYER 1: Deep Security Audit via AI Sentinel
        const moderationResult = await scanContent(`${title} ${content} ${excerpt}`);
        if (!moderationResult.isSafe) {
            const user = await User.findById(req.user._id);
            // Alert user of the security violation via secure mail protocols
            await sendModerationWarning(user.email, content, moderationResult.detected);
            return res.status(400).json({
                message: 'Content rejected by AI Moderation Sentinels. A security warning has been dispatched to your email.',
                detected: moderationResult.detected
            });
        }

        const article = await Article.create({
            title,
            content,
            excerpt,
            category,
            tags,
            coverImage,
            readTime,
            status: status || 'published',
            author: req.user._id
        });

        // Award contribution points and calculate evolution stage if published
        if (status !== 'draft') {
            const author = await User.findById(req.user._id);
            if (author) {
                author.reputationPoints += 50;
                author.articlesWritten += 1;
                author.evolutionStage = getEvolutionStage(author.reputationPoints);
                await author.save();
            }
        }

        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error: error.message });
    }
};

/**
 * @desc    Adds a popularity upvote to an article.
 * @route   PUT /api/articles/:id/like
 */
exports.likeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        article.likes += 1;
        await article.save();

        res.status(200).json({ likes: article.likes });
    } catch (error) {
        res.status(500).json({ message: 'Error liking article', error: error.message });
    }
};

/**
 * @desc    Leverages LLM inference to generate a technical summary of the content.
 * @route   POST /api/articles/:id/summarize
 */
exports.summarizeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const summaryData = await generateSummary(article.content);
        res.status(200).json(summaryData);
    } catch (error) {
        res.status(500).json({ message: 'Error generating summary', error: error.message });
    }
};

/**
 * @desc    Diagnostic tool that analyzes a draft for structural and security flaws before publishing.
 * @route   POST /api/articles/analyze-draft
 */
exports.analyzeDraft = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        // Solomon Drafting Sentinel logic call
        const analysis = await analyzeDraft(title, content, category, tags);
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ message: 'Sentinel analysis failed', error: error.message });
    }
};
