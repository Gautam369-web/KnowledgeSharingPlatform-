require('dotenv').config();
const { sendOTPEmail } = require('./config/mail');
(async () => {
    console.log('Sending email...');
    try {
        const res = await sendOTPEmail('test@example.com', '123456');
        console.log('Response:', res);
    } catch (e) {
        console.log('Caught error at top level:', e);
    }
})();
