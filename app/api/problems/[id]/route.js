import dbConnect from '@/lib/mongodb';
import Problem from '@/models/Problem';
import Solution from '@/models/Solution';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const problem = await Problem.findById(params.id)
            .populate('author', 'name avatar reputation')
            .populate({
                path: 'solutions',
                populate: { path: 'author', select: 'name avatar reputation' }
            });

        if (!problem) {
            return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
        }

        return NextResponse.json(problem);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching problem', error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const problem = await Problem.findByIdAndUpdate(params.id, data, { new: true });
        return NextResponse.json(problem);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating problem', error: error.message }, { status: 500 });
    }
}
