'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/lib/data';
import RichTextEditor from '@/components/RichTextEditor';
import toast from 'react-hot-toast';
import {
    HiOutlineLightBulb, HiOutlineTag, HiOutlineX,
    HiOutlineInformationCircle, HiOutlineArrowLeft
} from 'react-icons/hi';

export default function NewProblemPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        tags: [],
        priority: 'medium',
    });
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addTag = (e) => {
        e.preventDefault();
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
            setFormData({ ...formData, tags: [...formData.tags, tag] });
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;

        if (!formData.category) {
            toast.error('Please select a category');
            return;
        }

        setLoading(true);
        // Simulate delay
        await new Promise(r => setTimeout(r, 1500));
        toast.success('Your question has been posted successfully!');
        router.push('/problems');
    };

    if (!isAuthenticated) {
        return (
            <div className="page-container flex items-center justify-center py-20">
                <div className="card p-12 text-center max-w-lg">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HiOutlineInformationCircle className="w-10 h-10 text-primary-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Account Required</h1>
                    <p className="text-slate-500 mb-8">You need to be signed in to post a technical problem to the community.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login" className="btn-primary w-full sm:w-auto">Sign In Now</Link>
                        <Link href="/" className="btn-ghost w-full sm:w-auto">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container max-w-5xl">
            <Link
                href="/problems"
                className="inline-flex items-center text-sm font-bold text-slate-500 
                 hover:text-primary-600 transition-colors mb-8 group"
            >
                <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Problems
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                            Ask a Technical Question
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Be specific and provide enough context for experts to help you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="card p-6 sm:p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="label-text text-base">Question Title</label>
                                <p className="text-xs text-slate-400 mb-2">Imagine you&apos;re asking a person. Be descriptive.</p>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., How to implement optimistic UI updates in React with Server Actions?"
                                    className="input-field text-lg font-semibold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="label-text text-base">Problem Details</label>
                                <p className="text-xs text-slate-400 mb-2">Explain what you&apos;re trying to do and what isn&apos;t working.</p>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(val) => setFormData({ ...formData, description: val })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-6 space-y-4">
                                <label className="label-text">Broad Category</label>
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="select-field font-bold"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="card p-6 space-y-4">
                                <label className="label-text">Select Priority</label>
                                <div className="flex items-center space-x-2">
                                    {['low', 'medium', 'high'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, priority: p })}
                                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${formData.priority === p
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="label-text">Tags <span className="text-slate-400 font-normal">(up to 5)</span></label>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(e))}
                                    placeholder="e.g., react, nodejs, typescript..."
                                    className="input-field pr-20"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="absolute right-2 top-2 h-10 px-4 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-lg text-xs"
                                >
                                    Add Tag
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl text-xs font-bold border border-primary-100 dark:border-primary-800">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500">
                                            <HiOutlineX className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                            <p className="text-sm text-slate-500 italic max-w-md">
                                💡 Tip: Questions with code snippets and clear descriptions get 50% more helpful answers.
                            </p>
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <Link href="/problems" className="btn-ghost flex-1 sm:flex-none">Cancel</Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary !px-12 flex-1 sm:flex-none"
                                >
                                    {loading ? 'Posting...' : 'Post Question'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Tips Column */}
                <div className="w-full lg:w-72 space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
                        <div className="flex items-center space-x-2 mb-4">
                            <HiOutlineInformationCircle className="w-5 h-5 text-primary-400" />
                            <h3 className="font-bold">Posting Tips</h3>
                        </div>
                        <ul className="text-xs space-y-4 text-slate-300">
                            <li className="flex gap-2">
                                <span className="text-primary-400">1.</span>
                                <span>Keep the title concise and specific.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-400">2.</span>
                                <span>Explain what you&apos;ve already tried to solve it.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-400">3.</span>
                                <span>Include error messages if applicable.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-400">4.</span>
                                <span>Tag correctly to reach the right experts.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
