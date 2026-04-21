const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const User = require('./models/User');
    const user = await User.findOne({ email: 'testagent1@example.com' });
    console.log(user.otp);
    process.exit(0);
  });
