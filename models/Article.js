import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)
