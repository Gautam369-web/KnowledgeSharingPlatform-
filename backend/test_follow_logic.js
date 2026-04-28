const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testFollow() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const users = await User.find().limit(2);
        if (users.length < 2) {
            console.log('Not enough users to test follow');
            process.exit(0);
        }

        const user1 = users[0];
        const user2 = users[1];

        console.log(`Current follows: ${user1.name} follows ${user1.following.length}`);

        // Mock follow logic to test arrays natively (since we don't have an auth token for the endpoint)
        if (!user1.following.includes(user2._id)) {
            user1.following.push(user2._id);
            user2.followers.push(user1._id);
            await user1.save();
            await user2.save();
            console.log(`Test Follow: ${user1.name} is now following ${user2.name}`);
        } else {
            // Unfollow
            user1.following = user1.following.filter(id => id.toString() !== user2._id.toString());
            user2.followers = user2.followers.filter(id => id.toString() !== user1._id.toString());
            await user1.save();
            await user2.save();
            console.log(`Test Unfollow: ${user1.name} unfollowed ${user2.name}`);
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

testFollow();
