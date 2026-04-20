const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['open', 'solved', 'closed'], default: 'open' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
}, { timestamps: true });

module.exports = mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
