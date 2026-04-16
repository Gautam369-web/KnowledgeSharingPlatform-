import dbConnect from '@/lib/mongodb';
import Problem from '@/models/Problem';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');

        let query = {};
        if (category && category !== 'All') query.category = category;
        if (tag) query.tags = { $in: [tag] };

        const problems = await Problem.find(query)
            .populate('author', 'name avatar reputation')
            .sort({ createdAt: -1 });

        return NextResponse.json(problems);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching problems', error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        // In a real app, get author ID from session
        const problem = await Problem.create(data);
        return NextResponse.json(problem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating problem', error: error.message }, { status: 500 });
    }
}
