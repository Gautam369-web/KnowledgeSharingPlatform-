export const categories = [
    { id: 1, name: 'Technology', icon: '💻', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300', count: 1234 },
    { id: 2, name: 'Science', icon: '🔬', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', count: 856 },
    { id: 3, name: 'Mathematics', icon: '📐', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300', count: 643 },
    { id: 4, name: 'Business', icon: '📊', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', count: 521 },
    { id: 5, name: 'Health', icon: '🏥', color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300', count: 398 },
    { id: 6, name: 'Education', icon: '📚', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300', count: 765 },
    { id: 7, name: 'Engineering', icon: '⚙️', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', count: 432 },
    { id: 8, name: 'Design', icon: '🎨', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300', count: 367 },
];

export const problems = [
    {
        id: '1',
        title: 'How to implement real-time notifications in a Next.js application?',
        description: `I'm building a collaborative platform using Next.js and need to implement real-time notifications. I've considered using WebSockets with Socket.io, but I'm not sure how to integrate it properly with the Next.js App Router.

**What I've tried:**
- Server-Sent Events (SSE) - works but limited
- Polling - too many requests
- Socket.io - integration issues with App Router

**Requirements:**
1. Real-time push notifications
2. Persistent notification storage
3. Read/unread status tracking
4. Works with Next.js App Router

Any guidance on the best approach would be greatly appreciated!`,
        author: {
            id: '1',
            name: 'Alex Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
            reputation: 15420,
        },
        category: 'Technology',
        tags: ['Next.js', 'WebSocket', 'Real-time', 'Notifications'],
        status: 'open',
        priority: 'high',
        upvotes: 47,
        downvotes: 2,
        views: 1234,
        solutions: 8,
        comments: 12,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T14:20:00Z',
    },
    {
        id: '2',
        title: 'Best practices for database schema design in MongoDB for a social platform',
        description: `I'm designing a database schema for a social media-like platform using MongoDB. The platform needs to handle:

- User profiles with followers/following
- Posts with likes, comments, and shares
- Real-time messaging
- Notification system

Should I use embedding or referencing? How do I handle many-to-many relationships efficiently?

Looking for practical advice from experienced developers.`,
        author: {
            id: '2',
            name: 'Sarah Chen',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
            reputation: 12800,
        },
        category: 'Technology',
        tags: ['MongoDB', 'Database Design', 'Schema', 'NoSQL'],
        status: 'solved',
        priority: 'medium',
        upvotes: 83,
        downvotes: 1,
        views: 2567,
        solutions: 12,
        comments: 23,
        createdAt: '2024-01-10T08:15:00Z',
        updatedAt: '2024-01-14T16:45:00Z',
    },
];

export const solutions = [
    {
        id: 's1',
        problemId: '1',
        content: `Great question! Here's a comprehensive approach to implementing real-time notifications in Next.js:

## Approach: Server-Sent Events + Database

For the Next.js App Router, I recommend using **Server-Sent Events (SSE)** combined with a database for persistence...`,
        author: {
            id: '2',
            name: 'Sarah Chen',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
            reputation: 12800,
        },
        upvotes: 34,
        downvotes: 1,
        isAccepted: true,
        createdAt: '2024-01-15T14:30:00Z',
        comments: [
            {
                id: 'c1',
                content: 'This is exactly what I needed! The SSE approach works great with App Router.',
                author: { id: '1', name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff' },
                createdAt: '2024-01-15T15:00:00Z',
            },
        ],
    },
];

export const articles = [
    {
        id: 'a1',
        title: 'Complete Guide to Building Scalable APIs with Next.js 14',
        excerpt: 'Learn how to build production-ready APIs using Next.js 14 App Router...',
        content: `# Complete Guide to Building Scalable APIs with Next.js 14...`,
        author: {
            id: '1',
            name: 'Alex Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
            reputation: 15420,
        },
        category: 'Technology',
        tags: ['Next.js', 'API', 'Backend', 'Tutorial'],
        likes: 234,
        views: 8934,
        readTime: 12,
        createdAt: '2024-01-10T09:00:00Z',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    },
];

export const leaderboard = [
    {
        id: '1', rank: 1, name: 'Alex Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
        reputation: 15420, solutions: 567, badges: 12,
        streak: 45, level: 'Legend',
    },
    {
        id: '2', rank: 2, name: 'Sarah Chen',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
        reputation: 12800, solutions: 423, badges: 10,
        streak: 32, level: 'Master',
    },
];

export const notifications = [
    { id: 'n1', type: 'solution', message: 'Sarah Chen answered your question', time: '5 min ago', read: false },
    { id: 'n2', type: 'upvote', message: 'Your solution received 10 upvotes', time: '1 hour ago', read: false },
];

export const stats = {
    totalProblems: 12543,
    totalSolutions: 34567,
    totalUsers: 8923,
    totalArticles: 2345,
    solvedRate: 78,
    activeUsers: 1234,
};
