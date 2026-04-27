/**
 * @file Problem.js
 * @description Mongoose model for technical problems and debugging challenges.
 */
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    // Diagnostic Metadata
    title: { type: String, required: true },
    description: { type: String, required: true }, // The technical challenge description
    category: { type: String, required: true }, // Logic, Frontend, Backend, etc.
    tags: [{ type: String }],

    // Triage Metrics
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['open', 'solved', 'closed'], default: 'open' },

    // Ownership & Engagement
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    // Relational Intelligence
    solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
}, { timestamps: true });

module.exports = mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
