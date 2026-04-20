'use client';

import Link from 'next/link';
import { formatNumber, getLevelColor } from '@/lib/utils';
import { HiOutlineStar, HiOutlineFire } from 'react-icons/hi';

export default function UserCard({ user }) {
    const levelColor = getLevelColor(user.level || 'Learner');

    return (
        <div className="card-hover p-5">
            <div className="flex items-center space-x-4">
                <Link href={`/profile/${user.id}`} className="relative group">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 
                     dark:ring-slate-800 transition-all group-hover:ring-primary-500"
                    />
                    {user.rank <= 3 && (
                        <span className="absolute -top-2 -right-2 bg-amber-400 text-white 
                           w-6 h-6 rounded-full flex items-center justify-center 
                           text-xs font-bold shadow-lg border-2 border-white 
                           dark:border-slate-900">
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                        </span>
                    )}
                </Link>

                <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.id}`}>
                        <h3 className="font-bold text-slate-900 dark:text-white truncate 
                         hover:text-primary-600 transition-colors">
                            {user.name}
                        </h3>
                    </Link>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${levelColor}`}>
                        {user.level || 'Contributor'}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span className="flex items-center">
                            <HiOutlineStar className="w-3.5 h-3.5 mr-1 text-amber-500" />
                            {formatNumber(user.reputation)} rep
                        </span>
                        <span className="flex items-center">
                            <HiOutlineFire className="w-3.5 h-3.5 mr-1 text-red-500" />
                            {user.streak} day streak
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50 
                    dark:border-slate-800">
                <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Solutions</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {formatNumber(user.solutions || 0)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Badges</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {user.badges || 0}
                    </p>
                </div>
            </div>
        </div>
    );
}
