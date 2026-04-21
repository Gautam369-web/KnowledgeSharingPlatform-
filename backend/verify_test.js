const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const User = require('./models/User');
        const user = await User.findOneAndUpdate({ email: 'testagent1@example.com' }, { isVerified: true }, { new: true });
        console.log(user ? "Verified successfully" : "Not found");
        process.exit(0);
    });
