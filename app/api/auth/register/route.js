import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendOTPEmail } from '@/lib/mail';

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false,
        });

        // Send OTP Email
        const emailResult = await sendOTPEmail(email, otp);

        if (!emailResult.success) {
            console.error('Failed to send verification email:', emailResult.error);
            // We still return 201 but inform that email failed, or we could handle it differently
        }

        return NextResponse.json({
            message: 'User registered successfully. Please verify your email.',
            userId: user._id,
            emailSent: emailResult.success
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
