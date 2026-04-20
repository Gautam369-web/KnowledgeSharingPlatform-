'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { leaderboard, problems as mockProblems, articles as mockArticles } from '@/lib/data';
import ProfileHeader from '@/components/ProfileHeader';
import ProblemCard from '@/components/ProblemCard';
import ArticleCard from '@/components/ArticleCard';
import ActivityFeed from '@/components/ActivityFeed';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineCode, HiOutlineBookOpen, HiOutlineLightningBolt, HiOutlineUserGroup } from 'react-icons/hi';

export default function ProfilePage() {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const user = leaderboard.find(u => u.id === id) || leaderboard[0];
    const isOwnProfile = currentUser?.id === user.id;

    const userProblems = mockProblems.filter(p => p.author.id === user.id);
    const userArticles = mockArticles.filter(a => a.author.id === user.id);

    const activities = [
        { type: 'problem', user: user.name, action: 'posted a new problem', target: 'Implementation of LSTM in PyTorch', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), link: '/problems/1' },
        { type: 'solution', user: user.name, action: 'provided a solution for', target: 'React Hydration Mismatch', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), link: '/problems/2' },
        { type: 'badge', user: user.name, action: 'earned the badge', target: 'Gold Contributor', date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: HiOutlineUserGroup },
        { id: 'problems', label: 'Problems', icon: HiOutlineLightningBolt, count: userProblems.length },
        { id: 'articles', label: 'Articles', icon: HiOutlineBookOpen, count: userArticles.length },
        { id: 'activity', label: 'Activity', icon: HiOutlineCode },
    ];

    return (
        <div className="page-container max-w-7xl mx-auto">
            <ProfileHeader user={{ ...user, joinedAt: '2023-01-01', problemsSolved: 42, articlesWritten: 12 }} isOwnProfile={isOwnProfile} />

            <div className="mt-12">
                <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary-500 text-primary-600 bg-primary-50/30'
                                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`ml-2 px-2 py-0.5 rounded-md text-[10px] ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div className="card p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
                                    <ActivityFeed activities={activities} />
                                </div>
                                <div className="card p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Expertise Areas</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['Distributed Systems', 'Computer Vision', 'Next.js', 'PyTorch', 'Rust'].map(tag => (
                                            <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'problems' && (
                            <div className="space-y-6">
                                {userProblems.length > 0 ? (
                                    userProblems.map(p => <ProblemCard key={p.id} problem={p} />)
                                ) : (
                                    <div className="card p-12 text-center text-slate-500">No problems posted yet.</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'articles' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userArticles.length > 0 ? (
                                    userArticles.map(a => <ArticleCard key={a.id} article={a} />)
                                ) : (
                                    <div className="col-span-full card p-12 text-center text-slate-500">No articles published yet.</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="card p-6">
                                <ActivityFeed activities={[...activities, ...activities]} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="card p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Top Accomplishments</h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white mr-3">
                                        <HiOutlineLightningBolt className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 leading-tight">Master Solver</p>
                                        <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest">50+ Problems Solved</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white mr-3">
                                        <HiOutlineBookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-amber-700 dark:text-amber-400 leading-tight">Published Author</p>
                                        <p className="text-[10px] text-amber-600/70 font-bold uppercase tracking-widest">10+ Featured Articles</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-1 shadow-sm border-slate-100 dark:border-slate-800 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" className="w-full h-40 object-cover rounded-t-[1.4rem]" alt="Tech" />
                            <div className="p-5">
                                <h4 className="font-bold mb-2">Latest Project</h4>
                                <p className="text-xs text-slate-500 mb-4">Building a decentralised CDN for high-performance asset delivery using Rust.</p>
                                <Link href="#" className="text-xs font-bold text-primary-600 hover:underline flex items-center">View Case Study <HiOutlineCode className="ml-1 w-3 h-3" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
