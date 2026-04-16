'use client';

import { useState } from 'react';
import Link from 'next/link';
import LeaderboardTable from '@/components/LeaderboardTable';
import UserCard from '@/components/UserCard';
import Sidebar from '@/components/Sidebar';
import { leaderboard } from '@/lib/data';
import { HiOutlineStar, HiOutlineTrendingUp, HiOutlineInformationCircle } from 'react-icons/hi';

export default function LeaderboardPage() {
    const [period, setPeriod] = useState('all-time');

    const users = leaderboard || [];
    const topThree = users.slice(0, 3);
    const theRest = users.slice(3);

    return (
        <div className="page-container">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <HiOutlineStar className="w-6 h-6 text-amber-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-primary-600">Expert Rankings</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Global Leaderboard
                            </h1>
                            <p className="text-slate-500 mt-2">Recognizing our most dedicated problem solvers and knowledge contributors.</p>
                        </div>

                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                            {['weekly', 'monthly', 'all-time'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${period === p
                                        ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {p.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Top 3 Champions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {topThree.map((user, i) => (
                            <div key={user.id} className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 rounded-3xl opacity-0 group-hover:opacity-10 -z-10 ${i === 0 ? 'from-amber-400 to-amber-600' :
                                    i === 1 ? 'from-slate-400 to-slate-600' :
                                        'from-orange-400 to-orange-600'
                                    }`} />
                                <UserCard user={{ ...user, rank: i + 1 }} />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                                <HiOutlineTrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                                Top Ranked Experts
                            </h3>
                            <div className="flex items-center text-xs font-bold text-slate-400">
                                <HiOutlineInformationCircle className="w-4 h-4 mr-1.5" />
                                Rankings updated every 24 hours
                            </div>
                        </div>
                        <LeaderboardTable users={leaderboard} />
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <Sidebar />
                    <div className="card p-6 mt-6 bg-primary-600 text-white border-0 overflow-hidden relative">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Want to rank up?</h4>
                            <p className="text-sm text-primary-100 mb-6 leading-relaxed">Solve complex problems, write featured articles, and help others to climb the leaderboard.</p>
                            <Link href="/problems" className="block w-full py-3 bg-white text-primary-600 rounded-xl font-bold text-center text-sm shadow-xl shadow-primary-900/20 active:scale-95 transition-all">
                                Browse Challenges
                            </Link>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
