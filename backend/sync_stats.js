const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const User = require('./models/User');
        const Problem = require('./models/Problem');
        const Article = require('./models/Article');

        const users = await User.find();
        for (const u of users) {
            const problemsCount = await Problem.countDocuments({ author: u._id });
            const articlesCount = await Article.countDocuments({ author: u._id });

            // Simple reputation logic based on actions
            const totalRep = (problemsCount * 10) + (articlesCount * 25);

            u.problemsSolved = problemsCount; // Note: mapping posted problems to solved for visibility
            u.articlesWritten = articlesCount;
            u.reputation = totalRep;

            await u.save();
        }
        console.log(`Successfully synced stats for ${users.length} users.`);
        process.exit(0);
    }).catch(e => {
        console.error(e);
        process.exit(1);
    });
