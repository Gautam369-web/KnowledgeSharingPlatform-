'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/lib/data';
import RichTextEditor from '@/components/RichTextEditor';
import toast from 'react-hot-toast';
import {
    HiOutlineAcademicCap, HiOutlinePhotograph, HiOutlineX,
    HiOutlineArrowLeft, HiOutlineSave
} from 'react-icons/hi';

export default function NewArticlePage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
        coverImage: null,
    });
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addTag = (e) => {
        e.preventDefault();
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag) && formData.tags.length < 8) {
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
        await new Promise(r => setTimeout(r, 2000));
        toast.success('Article submitted for review!');
        router.push('/articles');
    };

    if (!isAuthenticated) {
        return (
            <div className="page-container flex items-center justify-center min-h-[60vh]">
                <div className="card p-12 text-center max-w-lg">
                    <h1 className="text-3xl font-bold mb-4">Writers Only</h1>
                    <p className="text-slate-500 mb-8">Sign in to share your knowledge with the platform.</p>
                    <Link href="/login" className="btn-primary">Sign In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container max-w-4xl mx-auto">
            <Link href="/articles" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-600 mb-8 group">
                <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Knowledge Base
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Write an Article</h1>
                        <p className="text-slate-500">Contribute your expertise to the community knowledge base.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="button" className="btn-secondary !py-2 text-sm flex items-center">
                            <HiOutlineSave className="w-4 h-4 mr-2" />
                            Save Draft
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary !py-2 text-sm">
                            {loading ? 'Publishing...' : 'Publish Article'}
                        </button>
                    </div>
                </div>

                <div className="card p-8 space-y-8">
                    <div className="space-y-2">
                        <label className="label-text text-base">Article Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Mastering Distributed Systems: A Practical Guide"
                            className="input-field text-2xl font-black border-transparent bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="label-text">Select Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat.name })}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${formData.category === cat.name
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600 shadow-md shadow-primary-500/10'
                                        : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'
                                        }`}
                                >
                                    {cat.icon} {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="label-text">Short Excerpt</label>
                        <textarea
                            name="excerpt"
                            required
                            rows={3}
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="Give readers a quick summary of what they&apos;ll learn..."
                            className="input-field resize-none text-slate-600 dark:text-slate-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="label-text">Cover Image</label>
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                            <HiOutlinePhotograph className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="font-bold text-slate-900 dark:text-white">Click to upload or drag cover image</p>
                            <p className="text-xs text-slate-400 mt-1">Recommended size: 1920x1080px (max 5MB)</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="label-text">Article Content</label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(val) => setFormData({ ...formData, content: val })}
                            placeholder="Use markdown to structure your article. Add code snippets, images, and clear headings..."
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="label-text">Tags</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(e))}
                                placeholder="Add up to 8 tags..."
                                className="input-field pr-20"
                            />
                            <button type="button" onClick={addTag} className="absolute right-2 top-2 h-10 px-4 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-lg text-xs">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold ring-1 ring-slate-200 dark:ring-slate-700">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500"><HiOutlineX className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
