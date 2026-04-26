const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const { getEvolutionStage } = require('./utils/gamification');

dotenv.config();

/**
 * Verification Script for Architect Evolution System
 */
async function verifyEvolution() {
    try {
        console.log('--- Phase 1: DB Connection ---');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('\n--- Phase 2: Logic Validation ---');
        const testPoints = [0, 150, 600, 2000, 6000];
        testPoints.forEach(p => {
            const stage = getEvolutionStage(p);
            console.log(`Reputation: ${p} -> Stage: ${stage}`);
        });

        console.log('\n--- Phase 3: Database Sync Check ---');
        const testUser = await User.findOne({ email: 'test@example.com' }); // Look for a test user or the user themselves
        if (testUser) {
            console.log(`Current User: ${testUser.name}`);
            console.log(`Reputation Points: ${testUser.reputationPoints}`);
            console.log(`Current Stage: ${testUser.evolutionStage}`);

            // Manual Trigger of Evolution Logic if stage is missing
            if (!testUser.evolutionStage || testUser.evolutionStage === 'Learner') {
                console.log('Updating legacy user to Architect System...');
                testUser.evolutionStage = getEvolutionStage(testUser.reputationPoints || 0);
                await testUser.save();
                console.log(`✅ User updated to ${testUser.evolutionStage}`);
            }
        } else {
            console.log('⚠️ No test user found. Creating a temporary node...');
            const newUser = await User.create({
                name: 'System Verifier',
                email: 'verify@solvehub.iq',
                password: 'temp_password',
                reputationPoints: 120,
                evolutionStage: getEvolutionStage(120)
            });
            console.log(`✅ Created test node: ${newUser.name} as ${newUser.evolutionStage}`);
            await User.deleteOne({ _id: newUser._id });
            console.log('✅ Temporary node purged.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Verification Failed:', error);
        process.exit(1);
    }
}

verifyEvolution();
