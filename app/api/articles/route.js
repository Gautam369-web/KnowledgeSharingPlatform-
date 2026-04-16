import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        let query = {};
        if (category && category !== 'All') query.category = category;

        const articles = await Article.find(query)
            .populate('author', 'name avatar reputation')
            .sort({ createdAt: -1 });

        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching articles', error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();
        const article = await Article.create(data);
        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating article', error: error.message }, { status: 500 });
    }
}
