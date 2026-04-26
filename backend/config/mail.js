const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: process.env.EMAIL_SERVER_PORT === '465',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Knowledge Platform'}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verify your email address',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">Welcome to our Platform!</h2>
                <p style="font-size: 16px; color: #555;">To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="font-size: 32px; letter-spacing: 5px; margin: 0; color: #0070f3;">${otp}</h1>
                </div>
                <p style="font-size: 14px; color: #888;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #aaa; text-align: center;">&copy; ${new Date().getFullYear()} Knowledge Sharing Platform. All rights reserved.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

const sendModerationWarning = async (email, contentSnapshot, detectedIssues) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: process.env.EMAIL_SERVER_PORT === '465',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'SolveHub security'}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'SECURITY ALERT: Content Moderation Warning',
        html: `
            <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a1a0d; color: #f0ebe0; border: 1px solid #6ec47a; border-radius: 10px;">
                <h2 style="color: #ef4444; text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">MODERATION PROTOCOL ACTIVATED</h2>
                <p style="font-size: 16px; color: #f0ebe0;">Our AI Content Sentinels have intercepted an attempt to post inappropriate content from your account.</p>
                
                <div style="background-color: rgba(239, 68, 68, 0.1); padding: 15px; border-left: 4px solid #ef4444; margin: 20px 0;">
                    <strong style="color: #ef4444;">Flagged Content Snapshot:</strong>
                    <p style="font-style: italic; color: #aaa;">"...${contentSnapshot.substring(0, 100)}..."</p>
                    <strong style="color: #ef4444;">Detected Violations:</strong>
                    <ul style="color: #f0ebe0;">
                        ${detectedIssues.map(issue => `<li>Inappropriate Language: [${issue}]</li>`).join('')}
                    </ul>
                </div>

                <p style="font-size: 14px; color: #6ec47a;">Please adhere to our community guidelines. Repeated violations may result in temporary or permanent suspension of your Knowledge Node access.</p>
                
                <hr style="border: 0; border-top: 1px solid rgba(110, 196, 122, 0.2); margin: 20px 0;">
                <p style="font-size: 11px; color: #666; text-align: center;">This is an automated security transmission. Response is not monitored.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending moderation email:', error);
        return { success: false, error };
    }
};

module.exports = { sendOTPEmail, sendModerationWarning };
