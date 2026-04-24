const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const User = require('./models/User');
    const users = await User.find();
    for (const u of users) {
      // Set premium Micah avatar
      u.avatar = `https://api.dicebear.com/8.x/micah/svg?seed=${encodeURIComponent(u.name)}&backgroundColor=0a1a0d,1a3c20,d4a017`;
      await u.save();
    }
    console.log(`Successfully updated ${users.length} legacy users with premium Micah avatars.`);
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
