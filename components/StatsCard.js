'use client';

import { formatNumber } from '@/lib/utils';
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from 'react-icons/hi';

export default function StatsCard({ label, value, trend, icon: Icon, color }) {
    const isPositive = trend > 0;

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs 
                         font-bold ${isPositive
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                        {isPositive ? (
                            <HiOutlineTrendingUp className="w-3 h-3" />
                        ) : (
                            <HiOutlineTrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    {label}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {typeof value === 'number' ? formatNumber(value) : value}
                </h3>
            </div>
        </div>
    );
}
