'use client';

import Link from 'next/link';
import { timeAgo } from '@/lib/utils';
import {
    HiOutlineLightBulb, HiOutlineChatAlt2,
    HiOutlineStar, HiOutlineUserAdd
} from 'react-icons/hi';

const ACTIVITY_ICONS = {
    problem: HiOutlineLightBulb,
    solution: HiOutlineChatAlt2,
    badge: HiOutlineStar,
    follow: HiOutlineUserAdd,
};

const ACTIVITY_COLORS = {
    problem: 'text-primary-500 bg-primary-100 dark:bg-primary-900/20',
    solution: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20',
    badge: 'text-amber-500 bg-amber-100 dark:bg-amber-900/20',
    follow: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20',
};

export default function ActivityFeed({ activities }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-sm text-slate-500 font-medium">No recent activity found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative before:absolute before:left-[17px] 
                  before:top-2 before:bottom-2 before:w-0.5 
                  before:bg-slate-100 dark:before:bg-slate-800">
            {activities.map((activity, idx) => {
                const Icon = ACTIVITY_ICONS[activity.type] || HiOutlineStar;
                const colorClass = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.badge;

                return (
                    <div key={idx} className="relative pl-12">
                        <div className={`absolute left-0 top-0 w-9 h-9 rounded-xl 
                           flex items-center justify-center z-10 shadow-sm 
                           border border-white dark:border-slate-900 ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-400">
                                    {timeAgo(activity.date)}
                                </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {activity.user}
                                </span>
                                {' '}{activity.action}{' '}
                                {activity.target && (
                                    <Link
                                        href={activity.link || '#'}
                                        className="font-bold text-primary-600 hover:underline"
                                    >
                                        {activity.target}
                                    </Link>
                                )}
                            </p>
                            {activity.content && (
                                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                        "{activity.content}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
