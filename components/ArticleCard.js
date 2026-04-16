'use client';

import Link from 'next/link';
import { formatNumber, timeAgo } from '@/lib/utils';
import {
    HiOutlineHeart, HiOutlineEye, HiOutlineClock,
    HiOutlineBookmark,
} from 'react-icons/hi';

export default function ArticleCard({ article, featured = false }) {
    return (
        <div className={`card-hover overflow-hidden group ${featured ? 'md:grid md:grid-cols-2 p-0' : 'p-0'
            }`}>
            {/* Cover Image */}
            <div className={`relative overflow-hidden ${featured ? 'h-full min-h-[240px]' : 'aspect-video'
                }`}>
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                   group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className="badge-primary shadow-lg backdrop-blur-md">
                        {article.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className={`p-6 flex flex-col ${featured ? 'justify-center' : ''}`}>
                <div className="flex items-center space-x-3 text-xs font-medium 
                      text-slate-400 mb-3">
                    <span className="flex items-center">
                        <HiOutlineClock className="w-4 h-4 mr-1" />
                        {article.readTime} min read
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{timeAgo(article.createdAt)}</span>
                </div>

                <Link href={`/articles/${article.id}`}>
                    <h3 className={`font-bold text-slate-900 dark:text-white mb-3 
                       group-hover:text-primary-600 dark:group-hover:text-primary-400 
                       transition-colors line-clamp-2 ${featured ? 'text-2xl leading-tight' : 'text-lg'
                        }`}>
                        {article.title}
                    </h3>
                </Link>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                    {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {article.author.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium">
                                {formatNumber(article.author.reputation)} rep
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex items-center text-slate-400 hover:text-red-500 
                             transition-colors p-1">
                            <HiOutlineHeart className="w-5 h-5" />
                            <span className="text-xs font-bold ml-1">
                                {formatNumber(article.likes)}
                            </span>
                        </button>
                        <button className="text-slate-400 hover:text-primary-500 
                             transition-colors p-1">
                            <HiOutlineBookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
