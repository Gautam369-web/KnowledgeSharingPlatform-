const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Article = require('../models/Article');

dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Migration Script: Set default status to 'published' for legacy articles
 */
async function migrateArticles() {
    try {
        console.log('🔄 Initializing Article Status Migration...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to Knowledge Node (MongoDB)');

        const result = await Article.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'published' } }
        );

        console.log(`\n✅ Migration Complete!`);
        console.log(`✨ Articles Restored: ${result.modifiedCount}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration Failed:', error);
        process.exit(1);
    }
}

migrateArticles();
