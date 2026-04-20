'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import DashboardStats from '@/components/DashboardStats';
import ActivityFeed from '@/components/ActivityFeed';
import ProblemCard from '@/components/ProblemCard';
import Sidebar from '@/components/Sidebar';
import { problems } from '@/lib/data';
import {
    HiOutlineUser, HiOutlineLightningBolt,
    HiOutlinePencilAlt, HiOutlineStar,
    HiOutlineFolderOpen, HiOutlineBell
} from 'react-icons/hi';

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    const userStats = {
        problemsSolved: 24,
        solutionsGiven: 42,
        reputation: user.reputation,
        articlesWritten: 7
    };

    const myProblems = problems.filter(p => p.author.id === user.id);

    const recentActivities = [
        { type: 'solution', user: 'You', action: 'answered', target: 'How to speed up MongoDB aggregation?', date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), link: '/problems/1' },
        { type: 'problem', user: 'You', action: 'posted', target: 'Memory leak in Node.js stream', date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), link: '/problems/2' },
        { type: 'badge', user: 'You', action: 'received', target: 'Helpful Contributor', date: new Date(Date.now() - 1000 * 3600 * 24).toISOString() },
    ];

    return (
        <div className="page-container">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                                Expert Dashboard
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Welcome back, <span className="text-slate-900 dark:text-white font-bold">{user.name}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative hover:bg-slate-50 transition-all">
                                <HiOutlineBell className="w-6 h-6 text-slate-500" />
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                            </button>
                            <Link href={`/profile/${user.id}`} className="btn-secondary !py-3">
                                <HiOutlineUser className="w-5 h-5 mr-2" />
                                View Public Profile
                            </Link>
                        </div>
                    </div>

                    <DashboardStats stats={userStats} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                    <HiOutlineLightningBolt className="w-5 h-5 mr-2 text-amber-500" />
                                    Action Center
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/problems/new" className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800 text-center hover:scale-105 transition-all group">
                                    <HiOutlineLightningBolt className="w-8 h-8 text-primary-600 mx-auto mb-2 group-hover:animate-bounce" />
                                    <p className="text-xs font-bold text-primary-700 dark:text-primary-400">Post Problem</p>
                                </Link>
                                <Link href="/articles/new" className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800 text-center hover:scale-105 transition-all group">
                                    <HiOutlinePencilAlt className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:animate-bounce" />
                                    <p className="text-xs font-bold text-purple-700 dark:text-purple-400">Write Article</p>
                                </Link>
                                <Link href="/leaderboard" className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 text-center hover:scale-105 transition-all group">
                                    <HiOutlineStar className="w-8 h-8 text-amber-600 mx-auto mb-2 group-hover:animate-bounce" />
                                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Check Rank</p>
                                </Link>
                                <Link href="/search" className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center hover:scale-105 transition-all group">
                                    <HiOutlineFolderOpen className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:animate-bounce" />
                                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">My Library</p>
                                </Link>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
                            <ActivityFeed activities={recentActivities} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">My Submissions</h3>
                        <div className="space-y-4">
                            {myProblems.map(p => (
                                <ProblemCard key={p.id} problem={p} />
                            ))}
                            {myProblems.length === 0 && (
                                <div className="card p-12 text-center text-slate-500 italic">
                                    You haven&apos;t posted any problems yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
