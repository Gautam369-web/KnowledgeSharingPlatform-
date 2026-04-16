'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden py-20 px-4">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 
                    rounded-full blur-3xl -z-10 animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 
                    rounded-full blur-3xl -z-10 animate-float" />

            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center px-4 py-2 rounded-full 
                         bg-primary-50 dark:bg-primary-900/30 text-primary-600 
                         dark:text-primary-400 text-sm font-bold border 
                         border-primary-100 dark:border-primary-800 mb-6">
                        🚀 The future of collaborative problem solving
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 
                       dark:text-white mb-6 tracking-tight leading-tight">
                        Solve Complex Problems <br />
                        <span className="gradient-text">with the Community</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 
                       max-w-3xl mx-auto leading-relaxed">
                        The leading platform for developers, scientists, and thinkers to share
                        expertise, solve challenging problems, and build a collective
                        knowledge base.
                    </p>

                    <div className="mb-12">
                        <SearchBar />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm 
                        font-semibold text-slate-500">
                        <div className="flex items-center">
                            <HiOutlineLightBulb className="w-5 h-5 mr-2 text-amber-500" />
                            <span>10K+ Problems Solved</span>
                        </div>
                        <div className="flex items-center">
                            <HiOutlineUserGroup className="w-5 h-5 mr-2 text-primary-500" />
                            <span>50K+ Experts Active</span>
                        </div>
                        <div className="flex items-center">
                            <HiOutlineShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
                            <span>Verified Solutions</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
