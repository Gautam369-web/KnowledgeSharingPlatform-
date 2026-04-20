'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProblemCard from '@/components/ProblemCard';
import ArticleCard from '@/components/ArticleCard';
import FeatureCard from '@/components/FeatureCard';
import StatsCard from '@/components/StatsCard';
import { problems, articles, stats } from '@/lib/data';
import {
    HiOutlineLightningBolt, HiOutlineUserGroup,
    HiOutlineGlobeAlt, HiOutlineCheckCircle,
    HiOutlineArrowRight, HiOutlineChatAlt2
} from 'react-icons/hi';

export default function Home() {
    const features = [
        {
            title: 'Problem Tracking',
            description: 'Easily post and track complex problems. Get notifications as the community provides solutions.',
            icon: HiOutlineLightningBolt,
            color: 'bg-primary-500',
        },
        {
            title: 'Expert Network',
            description: 'Connect with subject matter experts across various fields and learn from their experience.',
            icon: HiOutlineUserGroup,
            color: 'bg-indigo-500',
        },
        {
            title: 'Global Knowledge',
            description: 'Access a worldwide repository of solved problems and detailed articles/tutorials.',
            icon: HiOutlineGlobeAlt,
            color: 'bg-emerald-500',
        },
        {
            title: 'Verified Solutions',
            description: 'High-quality, peer-reviewed solutions that you can trust for your critical projects.',
            icon: HiOutlineCheckCircle,
            color: 'bg-amber-500',
        },
    ];

    return (
        <div className="flex flex-col">
            <HeroSection />

            {/* Stats Section */}
            <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatsCard label="Solved Problems" value={stats.totalSolutions} trend={12} icon={HiOutlineCheckCircle} color="bg-emerald-500" />
                        <StatsCard label="Active Experts" value={stats.activeUsers} trend={8} icon={HiOutlineUserGroup} color="bg-primary-500" />
                        <StatsCard label="Knowledge Articles" value={stats.totalArticles} trend={15} icon={HiOutlineGlobeAlt} color="bg-purple-500" />
                        <StatsCard label="Community Members" value={stats.totalUsers} trend={5} icon={HiOutlineChatAlt2} color="bg-amber-500" />
                    </div>
                </div>
            </section>

            {/* Recent Problems */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Recent Challenges
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Lending a hand? Here are the latest problems seeking solutions.
                            </p>
                        </div>
                        <Link href="/problems" className="btn-ghost group">
                            View all problems
                            <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {problems.map((problem) => (
                            <ProblemCard key={problem.id} problem={problem} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Everything you need to <br />
                            <span className="gradient-text">Solve and Share</span>
                        </h2>
                        <p className="section-subtitle">
                            Powerful tools designed to foster collaboration and streamline knowledge discovery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} {...feature} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Knowledge Base
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                In-depth guides and tutorials from our top contributors.
                            </p>
                        </div>
                        <Link href="/articles" className="btn-ghost group">
                            Browse articles
                            <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        {articles.slice(0, 1).map((article) => (
                            <ArticleCard key={article.id} article={article} featured />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="max-w-5xl mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative card p-12 md:p-20 text-center !rounded-[2.5rem] border-0 bg-gradient-to-br from-slate-900 to-slate-800">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Join the <br />
                            Expert Community?
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                            Start contributing today. Whether you have a problem to solve or
                            expertise to share, SolveHub is the place for you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/register" className="btn-primary w-full sm:w-auto text-lg !px-10">
                                Create Free Account
                            </Link>
                            <Link href="/problems" className="w-full sm:w-auto px-10 py-3 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-700 transition-colors">
                                Explore Problems
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
