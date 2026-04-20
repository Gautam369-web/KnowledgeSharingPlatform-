const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

CommentSchema.add({
    replies: [CommentSchema]
});

const SolutionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isAccepted: { type: Boolean, default: false },
    comments: [CommentSchema],
}, { timestamps: true });

module.exports = mongoose.models.Solution || mongoose.model('Solution', SolutionSchema);
