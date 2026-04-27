/**
 * @file authController.js
 * @description Authentication Engine for SolveHub.
 * Implements a dual-layer registration process with OTP verification, 
 * JWT-based session management, and password recovery protocols.
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/mail');

/**
 * @desc    Initial registration handshake.
 *          Creates an unverified user and dispatches a security OTP.
 * @route   POST /api/auth/register
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing identity to prevent duplicate entry
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Securely hash the password before database persistence
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a cryptographically random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minute TTL

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            otp,
            otpExpiry
        });

        // Dispatch OTP via the secure mail transport layer
        await sendOTPEmail(email, otp);

        res.status(201).json({
            message: 'Registration successful. Please verify your email via OTP.',
            email: user.email
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

/**
 * @desc    Standardizes user verification by validating the security OTP.
 *          Activates the account and generates the initial session JWT.
 * @route   POST /api/auth/verify-otp
 */
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate OTP match and ensure it has not expired
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Activate the profile and clear the temporary OTP fields
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Environment configuration error: JWT_SECRET is missing' });
        }

        // Generate a long-lived JWT for the verified session
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            message: 'Email verified successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('OTP Verification Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

/**
 * @desc    Regenerates a fresh security OTP for a user-requested verification retry.
 * @route   POST /api/auth/resend-otp
 */
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendOTPEmail(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

/**
 * @desc    Standard login flow. Compares hashes and returns a session token.
 * @route   POST /api/auth/login
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password using bcrypt's secure comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        // Construct the public user response (excluding sensitive hashes)
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            reputation: user.reputation || 0,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f59e0b&color=0d0d0f`,
            joinedAt: user.createdAt,
            problemsSolved: user.problemsSolved || 0,
            articlesWritten: user.articlesWritten || 0,
        };

        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Environment configuration error: JWT_SECRET is missing' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

/**
 * @desc    Initiates the password recovery flow by dispatching a reset OTP.
 * @route   POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        const { sendOTPEmail } = require('../config/mail');
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'Password reset OTP sent to email' });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

/**
 * @desc    Finalizes password recovery by validating the reset OTP and applying the new hash.
 * @route   POST /api/auth/reset-password
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
