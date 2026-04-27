/**
 * @file User.js
 * @description Mongoose model for User profiles.
 * Includes advanced fields for the Architect gamification system and security OTPs.
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Core Identity
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Aesthetic & Profile
    avatar: { type: String, default: 'https://api.dicebear.com/8.x/micah/svg?seed=Solarpunk&backgroundColor=0a1a0d' },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    github: { type: String },

    // Gamification & Evolution (Solomon Logic)
    reputation: { type: Number, default: 0 }, // Legacy/Simple reputation
    reputationPoints: { type: Number, default: 10 }, // High-precision Architect EXP
    level: { type: String, default: 'Seed Node' },
    evolutionStage: { type: String, default: 'Dormant Seed' }, // Ranks: Seed, Sprout, Sapling, Tree, Architect
    specialization: { type: String, default: 'Generalist' }, // Assigned via semantic analysis of tags
    streak: { type: Number, default: 0 },
    badges: [{ type: String }],

    // Technical Contribution Metrics
    problemsSolved: { type: Number, default: 0 },
    articlesWritten: { type: Number, default: 0 },

    // Security Handshake
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },

    // Social Graph
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
