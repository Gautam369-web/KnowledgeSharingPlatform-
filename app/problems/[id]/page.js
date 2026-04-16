'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { problems, solutions as mockSolutions } from '@/lib/data';
import { timeAgo, formatNumber, getStatusColor, getPriorityColor } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import VoteButtons from '@/components/VoteButtons';
import TagBadge from '@/components/TagBadge';
import SolutionCard from '@/components/SolutionCard';
import RichTextEditor from '@/components/RichTextEditor';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiOutlineClock, HiOutlineEye, HiOutlineChatAlt2,
    HiOutlineShare, HiOutlineFlag, HiOutlinePencil,
    HiOutlineCheckCircle, HiOutlineArrowLeft
} from 'react-icons/hi';

export default function ProblemDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [newSolution, setNewSolution] = useState('');
    const [sortSolutions, setSortSolutions] = useState('votes');

    const problem = problems.find(p => p.id === id) || problems[0];
    const solutions = mockSolutions.filter(s => s.problemId === problem.id);

    const handleSubmitSolution = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please sign in to post an answer');
            return;
        }
        if (!newSolution.trim()) return;

        toast.success('Solution posted successfully!');
        setNewSolution('');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="page-container">
            <Link
                href="/problems"
                className="inline-flex items-center text-sm font-bold text-slate-500 
                 hover:text-primary-600 transition-colors mb-8 group"
            >
                <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Problems
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    {/* Problem Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 
                         dark:text-white mb-6 leading-tight">
                            {problem.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold 
                          text-slate-400 border-b border-slate-100 
                          dark:border-slate-800 pb-6">
                            <span className={getStatusColor(problem.status)}>
                                {problem.status}
                            </span>
                            <span className={`flex items-center ${getPriorityColor(problem.priority)}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                                {problem.priority} Priority
                            </span>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                    <HiOutlineClock className="w-4 h-4 mr-1.5" />
                                    Asked {timeAgo(problem.createdAt)}
                                </span>
                                <span className="flex items-center">
                                    <HiOutlineEye className="w-4 h-4 mr-1.5" />
                                    {formatNumber(problem.views)} views
                                </span>
                                <span className="flex items-center">
                                    <HiOutlineChatAlt2 className="w-4 h-4 mr-1.5" />
                                    {solutions.length} answers
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Problem Body */}
                    <div className="flex gap-4 sm:gap-6 mb-12">
                        <div className="hidden sm:block">
                            <VoteButtons
                                upvotes={problem.upvotes}
                                downvotes={problem.downvotes}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="prose-content md:text-lg leading-relaxed mb-8">
                                {problem.description.split('\n').map((para, i) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {problem.tags.map(tag => (
                                    <TagBadge key={tag} tag={tag} />
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 
                            border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center space-x-4">
                                    <button onClick={handleShare} className="btn-ghost text-xs">
                                        <HiOutlineShare className="w-4 h-4 mr-1.5" />
                                        Share
                                    </button>
                                    <button className="btn-ghost text-xs">
                                        <HiOutlineFlag className="w-4 h-4 mr-1.5" />
                                        Report
                                    </button>
                                </div>

                                <Link href={`/profile/${problem.author.id}`} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <img
                                        src={problem.author.avatar}
                                        alt={problem.author.name}
                                        className="w-10 h-10 rounded-xl"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Author</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                            {problem.author.name}
                                        </p>
                                        <p className="text-[10px] font-bold text-primary-600 mt-1">
                                            {formatNumber(problem.author.reputation)} Reputation
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Solutions Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {solutions.length} {solutions.length === 1 ? 'Solution' : 'Solutions'}
                            </h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Sort:</span>
                                <select
                                    value={sortSolutions}
                                    onChange={(e) => setSortSolutions(e.target.value)}
                                    className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-400 focus:outline-none cursor-pointer"
                                >
                                    <option value="votes">Highest Rated</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {solutions.map((solution) => (
                                <SolutionCard key={solution.id} solution={solution} />
                            ))}
                        </div>
                    </div>

                    {/* Post Solution Section */}
                    <div className="card p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                            <HiOutlinePencil className="w-5 h-5 mr-2 text-primary-500" />
                            Your Solution
                        </h3>
                        {isAuthenticated ? (
                            <form onSubmit={handleSubmitSolution} className="space-y-6">
                                <RichTextEditor
                                    value={newSolution}
                                    onChange={setNewSolution}
                                    placeholder="Share your expertise. Be descriptive and include code examples if relevant..."
                                />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-500 flex items-center">
                                        <HiOutlineCheckCircle className="w-4 h-4 mr-1.5 text-emerald-500" />
                                        Be sure to follow community guidelines
                                    </p>
                                    <button type="submit" className="btn-primary !px-8">
                                        Post Your Solution
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-slate-500 font-medium mb-6">Sign in to contribute your solution to this challenge</p>
                                <Link href="/login" className="btn-primary">
                                    Sign In to Answer
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
