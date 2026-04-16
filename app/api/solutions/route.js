import dbConnect from '@/lib/mongodb';
import Solution from '@/models/Solution';
import Problem from '@/models/Problem';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        const solution = await Solution.create(data);

        // Add solution reference to the problem
        await Problem.findByIdAndUpdate(data.problemId, {
            $push: { solutions: solution._id }
        });

        return NextResponse.json(solution, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error posting solution', error: error.message }, { status: 500 });
    }
}
