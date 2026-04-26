const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://api.dicebear.com/8.x/micah/svg?seed=Solarpunk&backgroundColor=0a1a0d' },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    github: { type: String },
    reputation: { type: Number, default: 0 },
    reputationPoints: { type: Number, default: 10 }, // For level calculations
    level: { type: String, default: 'Seed Node' },
    evolutionStage: { type: String, default: 'Dormant Seed' }, // Dormant Seed, Sprout, Sapling, Knowledge Tree, Solar Architect
    specialization: { type: String, default: 'Generalist' }, // Assigned based on tag interaction
    streak: { type: Number, default: 0 },
    badges: [{ type: String }],
    problemsSolved: { type: Number, default: 0 },
    articlesWritten: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
