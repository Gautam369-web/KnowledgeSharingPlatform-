/**
 * @file Article.js
 * @description Mongoose model for long-form technical articles.
 * Core content unit for Solarpunk knowledge sharing.
 */
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    // Content Metadata
    title: { type: String, required: true },
    excerpt: { type: String, required: true }, // Short TL;DR for listings
    content: { type: String, required: true }, // Full Markdown/HTML body
    category: { type: String, required: true }, // High-level grouping
    tags: [{ type: String }], // Granular technical keywords
    coverImage: { type: String }, // Solarpunk aesthetic banner

    // Ownership
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Engagement Metrics
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 }, // Estimated minutes

    // System Status
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
