'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { timeAgo, formatNumber } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import CommentSection from '@/components/CommentSection';
import TagBadge from '@/components/TagBadge';
import toast from 'react-hot-toast';
import {
    HiOutlineClock, HiOutlineHeart, HiOutlineBookmark,
    HiOutlineShare, HiOutlineChatAlt2, HiOutlineArrowLeft
} from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function ArticleDetailPage() {
    const { id } = useParams();
    const article = articles.find(a => a.id === id) || articles[0];

    const handleLike = () => {
        toast.success('Added to your favorites!');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
    };

    return (
        <div className="page-container max-w-7xl mx-auto">
            <Link
                href="/articles"
                className="inline-flex items-center text-sm font-bold text-slate-500 
                 hover:text-primary-600 transition-colors mb-8 group"
            >
                <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
                <article className="flex-1 min-w-0">
                    <div className="mb-8">
                        <span className="badge-primary mb-4">{article.category}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800">
                            <div className="flex items-center space-x-4">
                                <Link href={`/profile/${article.author.id}`}>
                                    <img
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        className="w-12 h-12 rounded-xl object-cover hover:ring-2 hover:ring-primary-500 transition-all"
                                    />
                                </Link>
                                <div>
                                    <Link href={`/profile/${article.author.id}`} className="font-bold text-slate-900 dark:text-white hover:text-primary-600">
                                        {article.author.name}
                                    </Link>
                                    <div className="flex items-center text-xs text-slate-400 font-medium space-x-2">
                                        <span>{article.readTime} min read</span>
                                        <span>•</span>
                                        <span>{timeAgo(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <FaTwitter className="w-4 h-4 text-sky-400" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-blue-600">
                                    <FaLinkedin className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose-content md:text-xl leading-relaxed mb-12">
                        {/* Article Content - In a real app this would be HTML from a CMS */}
                        <p className="mb-6 font-medium text-slate-600 dark:text-slate-400">
                            {article.excerpt}
                        </p>
                        <p className="mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-6">Practical Implementation</h2>
                        <p className="mb-6">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="bg-slate-900 rounded-2xl p-6 mb-8 text-sm">
                            <code className="text-emerald-400">
                                {`// Example implementation code`}
                                <br />
                                {`function solveProblem(context) {`}
                                <br />
                                {`  console.log("Analyzing...", context);`}
                                <br />
                                {`  return context.mapped(item => item.optimized);`}
                                <br />
                                {`}`}
                            </code>
                        </div>
                        <p className="mb-6">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {article.tags?.map(tag => (
                            <TagBadge key={tag} tag={tag} />
                        ))}
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-6">
                            <button onClick={handleLike} className="flex items-center space-x-2 font-bold text-slate-500 hover:text-red-500 transition-colors">
                                <HiOutlineHeart className="w-6 h-6" />
                                <span>{article.likes} Likes</span>
                            </button>
                            <button className="flex items-center space-x-2 font-bold text-slate-500 hover:text-primary-600 transition-colors">
                                <HiOutlineChatAlt2 className="w-6 h-6" />
                                <span>{article.comments} Comments</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button onClick={handleShare} className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:text-primary-600">
                                <HiOutlineShare className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:text-primary-600">
                                <HiOutlineBookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                        <CommentSection
                            comments={article.commentsList || []}
                            parentId={article.id}
                            parentType="article"
                        />
                    </div>
                </article>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div className="card p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">About the Author</h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <img src={article.author.avatar} className="w-16 h-16 rounded-2xl" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{article.author.name}</h4>
                                    <p className="text-xs text-primary-600 font-bold mb-1">Top Contributor</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{formatNumber(article.author.reputation)} Rep</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">Expert in front-end architecture and distributed systems. Helping teams build better software.</p>
                            <button className="w-full btn-primary text-sm font-bold">Follow Expert</button>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
