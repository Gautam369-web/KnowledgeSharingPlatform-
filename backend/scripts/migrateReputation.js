const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const { getEvolutionStage } = require('../utils/gamification');

dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Migration Script: Align legacy reputation with new reputationPoints
 */
async function migrateReputation() {
    try {
        console.log('🔄 Initializing Reputation Migration...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to Knowledge Node (MongoDB)');

        const users = await User.find({});
        console.log(`📡 Analyzing ${users.length} user profiles...`);

        let updatedCount = 0;
        for (const user of users) {
            let changed = false;

            // 1. Ensure reputationPoints is at least equal to old reputation
            if (user.reputationPoints === undefined || user.reputationPoints === 0) {
                user.reputationPoints = user.reputation || 0;
                changed = true;
            }

            // 2. Ensure evolutionStage is calculated
            if (!user.evolutionStage || user.evolutionStage === 'Learner') {
                user.evolutionStage = getEvolutionStage(user.reputationPoints);
                changed = true;
            }

            if (changed) {
                await user.save();
                updatedCount++;
            }
        }

        console.log(`\n✅ Migration Complete!`);
        console.log(`✨ Profiles Optimized: ${updatedCount}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration Failed:', error);
        process.exit(1);
    }
}

migrateReputation();
