'use client';

import Link from 'next/link';
import { formatNumber, timeAgo, getStatusColor, getPriorityColor } from '@/lib/utils';
import {
    HiOutlineChatAlt2, HiOutlineEye, HiOutlineChevronUp,
    HiOutlineChevronDown, HiOutlineClock,
} from 'react-icons/hi';

export default function ProblemCard({ problem }) {
    const statusColor = getStatusColor(problem.status);
    const priorityColor = getPriorityColor(problem.priority);

    return (
        <div className="card-hover p-5 sm:p-6">
            <div className="flex items-start gap-4 sm:gap-6">
                {/* Vote count (desktop) */}
                <div className="hidden sm:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 
                        flex flex-col items-center justify-center border 
                        border-slate-100 dark:border-slate-700">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {formatNumber(problem.upvotes - problem.downvotes)}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                            votes
                        </span>
                    </div>
                    <div className={`mt-3 w-12 h-12 rounded-xl flex flex-col items-center 
                         justify-center border ${problem.status === 'solved'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400'
                        }`}>
                        <span className="text-sm font-bold">
                            {formatNumber(problem.solutions)}
                        </span>
                        <span className="text-[10px] uppercase font-bold">
                            answers
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={statusColor}>{problem.status}</span>
                        <span className={`text-xs font-bold uppercase tracking-wider 
                           flex items-center ${priorityColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                            {problem.priority} priority
                        </span>
                    </div>

                    <Link href={`/problems/${problem.id}`}>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 
                         dark:text-white mb-2 line-clamp-2 hover:text-primary-600 
                         dark:hover:text-primary-400 transition-colors">
                            {problem.title}
                        </h3>
                    </Link>

                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                        {problem.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {problem.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/problems?tag=${tag}`}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 
                         text-slate-600 dark:text-slate-400 text-xs 
                         font-medium rounded-lg hover:bg-primary-50 
                         dark:hover:bg-primary-900/20 hover:text-primary-600 
                         transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 text-xs font-medium 
                          text-slate-400">
                            <span className="flex items-center">
                                <HiOutlineEye className="w-4 h-4 mr-1" />
                                {formatNumber(problem.views)} views
                            </span>
                            <span className="flex items-center">
                                <HiOutlineChatAlt2 className="w-4 h-4 mr-1" />
                                {problem.comments} comments
                            </span>
                            <span className="flex items-center">
                                <HiOutlineClock className="w-4 h-4 mr-1" />
                                {timeAgo(problem.createdAt)}
                            </span>
                        </div>

                        <Link
                            href={`/profile/${problem.author.id}`}
                            className="flex items-center space-x-2 group"
                        >
                            <img
                                src={problem.author.avatar}
                                alt={problem.author.name}
                                className="w-6 h-6 rounded-md object-cover"
                            />
                            <span className="text-xs font-semibold text-slate-600 
                             dark:text-slate-400 group-hover:text-primary-600 
                             transition-colors">
                                {problem.author.name}
                            </span>
                            <span className="text-[10px] bg-primary-50 dark:bg-primary-900/20 
                             text-primary-600 px-1.5 py-0.5 rounded-md font-bold">
                                {formatNumber(problem.author.reputation)}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
