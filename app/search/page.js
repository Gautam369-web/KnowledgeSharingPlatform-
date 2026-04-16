'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import ProblemCard from '@/components/ProblemCard';
import ArticleCard from '@/components/ArticleCard';
import UserCard from '@/components/UserCard';
import { problems, articles, leaderboard } from '@/lib/data';
import { HiOutlineSearch, HiOutlineDocumentText, HiOutlineQuestionMarkCircle, HiOutlineUserGroup } from 'react-icons/hi';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [activeTab, setActiveTab] = useState('all');

    const filteredProblems = problems.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
    );

    const filteredUsers = leaderboard.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase())
    );

    const totalResults = filteredProblems.length + filteredArticles.length + filteredUsers.length;

    const tabs = [
        { id: 'all', label: 'All Results', count: totalResults },
        { id: 'problems', label: 'Problems', icon: HiOutlineQuestionMarkCircle, count: filteredProblems.length },
        { id: 'articles', label: 'Articles', icon: HiOutlineDocumentText, count: filteredArticles.length },
        { id: 'people', label: 'People', icon: HiOutlineUserGroup, count: filteredUsers.length },
    ];

    return (
        <div className="page-container max-w-6xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">
                    {query ? `Search Results for "${query}"` : 'Global Search'}
                </h1>
                <SearchBar fullWidth />
            </div>

            <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'border-primary-500 text-primary-600'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab.icon && <tab.icon className="w-4 h-4" />}
                        <span>{tab.label}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded-md text-[10px] ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="space-y-12 pb-20">
                {(activeTab === 'all' || activeTab === 'problems') && filteredProblems.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <HiOutlineQuestionMarkCircle className="w-6 h-6 mr-2 text-primary-500" />
                            Technical Problems
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredProblems.map(p => <ProblemCard key={p.id} problem={p} />)}
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <HiOutlineDocumentText className="w-6 h-6 mr-2 text-purple-500" />
                            Knowledge Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'people') && filteredUsers.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <HiOutlineUserGroup className="w-6 h-6 mr-2 text-emerald-500" />
                            Expert Network
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {filteredUsers.map(u => <UserCard key={u.id} user={u} />)}
                        </div>
                    </div>
                )}

                {totalResults === 0 && (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <HiOutlineSearch className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No results matching your search</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">Try different keywords or check your spelling for better results.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchContent />
        </Suspense>
    );
}
