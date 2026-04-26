'use client';

import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { HiOutlineTrendingUp, HiOutlineFire } from 'react-icons/hi';
import EvolutionBadge from './EvolutionBadge';

export default function LeaderboardTable({ users }) {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                            <th className="px-6 py-4">Rank</th>
                            <th className="px-6 py-4">Expert</th>
                            <th className="px-6 py-4 text-center">Reputation</th>
                            <th className="px-6 py-4 text-center">Solutions</th>
                            <th className="px-6 py-4 text-center">Badges</th>
                            <th className="px-6 py-4 text-center">Streak</th>
                            <th className="px-6 py-4 text-right">Activity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {users.map((user, idx) => {
                            return (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg 
                                  bg-slate-100 dark:bg-slate-800 font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Link href={`/profile/${user.id}`} className="flex items-center space-x-3 group/user">
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 
                                     dark:ring-slate-800 group-hover/user:ring-primary-500 transition-all"
                                                />
                                                <div style={{ position: 'absolute', top: -8, right: -8 }}>
                                                    <EvolutionBadge stage={user.evolutionStage} size={20} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white group-hover/user:text-primary-600 transition-colors">
                                                    {user.name}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">
                                                        {user.evolutionStage}
                                                    </p>
                                                    <span className="text-[9px] text-[#d4a017] font-black uppercase tracking-tighter opacity-70">
                                                        {user.specialization || 'Neural Architect'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="font-bold text-primary-600">
                                            {formatNumber(user.reputationPoints || user.reputation)} EXP
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="font-bold text-slate-700 dark:text-slate-300">
                                            {formatNumber(user.problemsSolved)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center px-2 py-1 bg-amber-50 
                                   dark:bg-amber-900/20 text-amber-600 rounded-lg font-bold text-xs">
                                            ⭐ {user.badges}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center text-red-500 font-bold text-sm">
                                            <HiOutlineFire className="w-4 h-4 mr-1" />
                                            {user.streak}d
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                                                <div
                                                    key={d}
                                                    className={`w-1.5 h-6 rounded-full ${Math.random() > 0.3 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
