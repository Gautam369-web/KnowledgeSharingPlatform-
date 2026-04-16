import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    github: { type: String },
    reputation: { type: Number, default: 0 },
    level: { type: String, default: 'Learner' },
    streak: { type: Number, default: 0 },
    badges: [{ type: String }],
    problemsSolved: { type: Number, default: 0 },
    articlesWritten: { type: Number, default: 0 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
