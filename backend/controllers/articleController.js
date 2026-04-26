const Article = require('../models/Article');
const { scanContent } = require('../utils/moderation');
const { sendModerationWarning } = require('../config/mail');
const User = require('../models/User');
const { generateSummary } = require('../utils/aiSummarizer');
const { getEvolutionStage } = require('../utils/gamification');
const { analyzeDraft } = require('../utils/draftSentinel');

// @desc    Get all articles with filtering
// @route   GET /api/articles
exports.getArticles = async (req, res) => {
    try {
        const { category, search, sort, status } = req.query;
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

// @desc    Get single article by ID
// @route   GET /api/articles/:id
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'name avatar bio level reputation');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment views
        article.views += 1;
        await article.save();

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
};

// @desc    Get Knowledge Web graph data
// @route   GET /api/articles/stats/graph
exports.getArticleGraph = async (req, res) => {
    try {
        const articles = await Article.find({}, 'category tags');

        const nodesMap = {};
        const linksSet = new Set();

        articles.forEach(article => {
            const cat = article.category || 'Uncategorized';
            if (!nodesMap[cat]) {
                nodesMap[cat] = { id: cat, val: 1, group: 1 };
            } else {
                nodesMap[cat].val += 1;
            }

            // Connect category to its tags
            article.tags?.forEach(tag => {
                if (!nodesMap[tag]) {
                    nodesMap[tag] = { id: tag, val: 0.5, group: 2 };
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

// @desc    Create new article
// @route   POST /api/articles
exports.createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, category, tags, coverImage, readTime, status } = req.body;

        // AI Moderation Check
        const moderationResult = await scanContent(`${title} ${content} ${excerpt}`);
        if (!moderationResult.isSafe) {
            const user = await User.findById(req.user._id);
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

        // Update author reputation and evolution
        if (status !== 'draft') {
            const author = await User.findById(req.user._id);
            if (author) {
                author.reputationPoints += 50; // Award points for meaningful creation
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

// @desc    Like an article
// @route   PUT /api/articles/:id/like
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

// @desc    Summarize article content using AI
// @route   POST /api/articles/:id/summarize
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

// @desc    Analyze article draft using AI
// @route   POST /api/articles/analyze-draft
exports.analyzeDraft = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const analysis = await analyzeDraft(title, content, category, tags);
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ message: 'Sentinel analysis failed', error: error.message });
    }
};
