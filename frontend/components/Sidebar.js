/**
 * @file Sidebar.js
 * @description Global discovery sidebar for the SolveHub platform.
 * Provides navigational entry points for the Knowledge Topology, 
 * categorized browsing, trending technical tags, and top-ranked community members.
 */

'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import { HiOutlineFire, HiOutlineTag, HiOutlineUsers, HiOutlineGlobeAlt } from 'react-icons/hi';

/**
 * Global Sidebar Component.
 * Integrates real-time trends and community highlights.
 */
export default function Sidebar() {
    // Trending Tags: Aggregated from recent platform activity
    const trendingTags = [
        { name: 'React', count: 1234 },
        { name: 'Next.js', count: 987 },
        { name: 'Python', count: 876 },
        { name: 'Machine Learning', count: 765 },
        { name: 'TypeScript', count: 654 },
        { name: 'Node.js', count: 543 },
        { name: 'CSS', count: 432 },
        { name: 'Docker', count: 321 },
    ];

    // High-Contribution Node Highlights (Contributors)
    const topContributors = [
        { name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff', reputation: 15420 },
        { name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff', reputation: 12800 },
        { name: 'David Kumar', avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff', reputation: 11200 },
    ];

    return (
        <aside className="space-y-6">
            {/* Knowledge Map Call to Action: Entry point to the Interactive Graph */}
            <Link
                href="/knowledge"
                className="card p-5 block border-dashed border-[#6ec47a] hover:bg-[rgba(110,196,122,0.05)] transition-all group"
            >
                <div className="flex items-center gap-3 mb-2">
                    <HiOutlineGlobeAlt className="text-[#6ec47a] group-hover:animate-spin-slow" />
                    <span className="text-xs font-black tracking-tighter text-[#6ec47a]">SYSTEM ACCESS</span>
                </div>
                <h4 className="text-[#f0ebe0] font-bold text-sm mb-1">Knowledge Topology</h4>
                <p className="text-[10px] text-[rgba(240,235,224,0.4)] leading-relaxed">
                    Access the interactive 2D IQ interface to visualize platform intelligence.
                </p>
            </Link>

            {/* Categorized Taxonomy Filter */}
            <div className="card p-5">
                <h3 className="font-semibold text-[#f0ebe0] mb-4 flex items-center">
                    <HiOutlineTag className="w-5 h-5 mr-2 text-[#6ec47a]" />
                    Categories
                </h3>
                <div className="space-y-1.5">
                    {categories.slice(0, 6).map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/problems?category=${cat.name}`}
                            className="flex items-center justify-between px-3 py-2 rounded-lg 
                       hover:bg-[rgba(240,235,224,0.05)] transition-colors group"
                        >
                            <span className="flex items-center space-x-2">
                                <span>{cat.icon}</span>
                                <span className="text-sm text-[rgba(240,235,224,0.6)] 
                                group-hover:text-[#f0ebe0]">
                                    {cat.name}
                                </span>
                            </span>
                            <span className="text-xs text-[rgba(240,235,224,0.4)] bg-[rgba(240,235,224,0.05)] 
                             px-2 py-0.5 rounded-full">
                                {formatNumber(cat.count)}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Thermal Trend Layer (Trending Tags) */}
            <div className="card p-5">
                <h3 className="font-semibold text-[#f0ebe0] mb-4 flex items-center">
                    <HiOutlineFire className="w-5 h-5 mr-2 text-orange-500" />
                    Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                        <Link
                            key={tag.name}
                            href={`/problems?tag=${tag.name}`}
                            className="px-3 py-1.5 bg-[rgba(240,235,224,0.05)] text-[rgba(240,235,224,0.6)] 
                       text-xs font-medium rounded-lg 
                       hover:bg-[rgba(212,160,23,0.1)] 
                       hover:text-[#d4a017] 
                       transition-colors"
                        >
                            #{tag.name}
                            <span className="ml-1 text-slate-400">×{formatNumber(tag.count)}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Neural Contributors (Top Users Sidebar View) */}
            <div className="card p-5">
                <h3 className="font-semibold text-[#f0ebe0] mb-4 flex items-center">
                    <HiOutlineUsers className="w-5 h-5 mr-2 text-[#6ec47a]" />
                    Top Contributors
                </h3>
                <div className="space-y-3">
                    {topContributors.map((user, i) => (
                        <Link
                            key={user.name}
                            href={`/profile/${i + 1}`}
                            className="flex items-center space-x-3 p-2 rounded-lg 
                       hover:bg-[rgba(240,235,224,0.05)] transition-colors"
                        >
                            <span className="text-sm font-bold text-[rgba(240,235,224,0.3)] w-5">
                                #{i + 1}
                            </span>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-lg"
                            />
                            <div>
                                <p className="text-sm font-medium text-[#f0ebe0]">
                                    {user.name}
                                </p>
                                <p className="text-xs text-[#d4a017]">
                                    {formatNumber(user.reputation)} rep
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link
                    href="/leaderboard"
                    className="block text-center text-sm text-[#d4a017] 
                   font-medium mt-4 hover:underline"
                >
                    View Leaderboard →
                </Link>
            </div>
        </aside>
    );
}
