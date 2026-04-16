import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({})
            .select('name avatar reputation level streak problemsSolved articlesWritten badges')
            .sort({ reputation: -1 })
            .limit(50);

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching leaderboard', error: error.message }, { status: 500 });
    }
}
