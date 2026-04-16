'use client';

import Link from 'next/link';
import { HiOutlineFire, HiOutlineTrendingUp } from 'react-icons/hi';
import { formatNumber } from '@/lib/utils';

export default function TrendingSection({ items, type = 'problems' }) {
    return (
        <div className="card p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                    <HiOutlineTrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                    Trending {type === 'problems' ? 'Problems' : 'Articles'}
                </h3>
                <Link
                    href={`/${type}`}
                    className="text-xs font-bold text-primary-600 hover:underline"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className="flex items-start space-x-3 group cursor-pointer"
                    >
                        <span className="text-2xl font-black text-slate-100 dark:text-slate-800 
                           group-hover:text-primary-100 dark:group-hover:text-primary-900/20 
                           transition-colors leading-none pt-1">
                            0{i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <Link href={`/${type}/${item.id}`}>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 
                             line-clamp-2 group-hover:text-primary-600 
                             transition-colors leading-tight mb-1">
                                    {item.title}
                                </h4>
                            </Link>
                            <div className="flex items-center space-x-3 text-[10px] font-bold 
                            text-slate-400 uppercase tracking-wider">
                                <span className="flex items-center">
                                    <HiOutlineFire className="w-3 h-3 mr-1 text-orange-500" />
                                    {formatNumber(item.views)} views
                                </span>
                                <span>•</span>
                                <span>{item.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
