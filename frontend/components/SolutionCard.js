'use client';

import Link from 'next/link';
import { timeAgo, formatNumber } from '@/lib/utils';
import VoteButtons from '@/components/VoteButtons';
import CommentSection from '@/components/CommentSection';
import { HiOutlineCheckCircle } from 'react-icons/hi';

export default function SolutionCard({ solution }) {
    return (
        <div className={`card p-6 ${solution.isAccepted ? 'ring-2 ring-emerald-500 dark:ring-emerald-400' : ''}`}>
            <div className="flex gap-4 sm:gap-6">
                <div className="hidden sm:block">
                    <VoteButtons
                        upvotes={solution.upvotes}
                        downvotes={solution.downvotes}
                    />
                    {solution.isAccepted && (
                        <div className="mt-3 flex flex-col items-center">
                            <HiOutlineCheckCircle className="w-10 h-10 text-emerald-500" />
                            <span className="text-xs text-emerald-500 font-bold mt-1">Accepted</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="prose-content mb-4 text-sm sm:text-base leading-relaxed">
                        {solution.content}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center space-x-2">
                            <Link href={`/profile/${solution.author.id}`} className="flex items-center space-x-2 group">
                                <img
                                    src={solution.author.avatar}
                                    alt={solution.author.name}
                                    className="w-8 h-8 rounded-lg object-cover"
                                />
                                <div>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary-600">
                                        {solution.author.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        answered {timeAgo(solution.createdAt)}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4">
                        <CommentSection
                            comments={solution.comments || []}
                            parentId={solution.id}
                            parentType="solution"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
