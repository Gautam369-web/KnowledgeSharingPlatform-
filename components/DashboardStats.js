'use client';

import {
    HiOutlineLightBulb, HiOutlineChatAlt2,
    HiOutlineAcademicCap, HiOutlineTrendingUp
} from 'react-icons/hi';
import { formatNumber } from '@/lib/utils';

export default function DashboardStats({ stats }) {
    const cards = [
        { label: 'Problems Solved', value: stats.problemsSolved, icon: HiOutlineLightBulb, color: 'text-primary-600 bg-primary-100 dark:bg-primary-900/30' },
        { label: 'Solutions Given', value: stats.solutionsGiven, icon: HiOutlineChatAlt2, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
        { label: 'Total Reputation', value: stats.reputation, icon: HiOutlineTrendingUp, iconColor: 'text-amber-500', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
        { label: 'Articles Published', value: stats.articlesWritten, icon: HiOutlineAcademicCap, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className="card p-5 flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                                {card.label}
                            </p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">
                                {formatNumber(card.value)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
