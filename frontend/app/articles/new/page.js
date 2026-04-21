'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import RichTextEditor from '@/components/RichTextEditor';
import toast from 'react-hot-toast';
import {
    HiOutlinePhotograph, HiOutlineX,
    HiOutlineArrowLeft, HiOutlineSave
} from 'react-icons/hi';

const CATEGORIES = [
    { id: 1, name: 'Technology', icon: '💻' },
    { id: 2, name: 'Science', icon: '🔬' },
    { id: 3, name: 'Mathematics', icon: '📐' },
    { id: 4, name: 'Business', icon: '📊' },
    { id: 5, name: 'Health', icon: '🏥' },
    { id: 6, name: 'Education', icon: '📚' },
    { id: 7, name: 'Engineering', icon: '⚙️' },
    { id: 8, name: 'Design', icon: '🎨' },
];

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
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop', // default fallback
    });
    const [tagInput, setTagInput] = useState('');

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

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
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, readTime: 5 }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Article published successfully!');
                router.push('/articles');
            } else {
                toast.error(data.message || 'Failed to publish article');
            }
        } catch (error) {
            toast.error('Network error during publication');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <div style={{ maxWidth: 500, width: '100%', background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 32, padding: '60px 40px', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, background: 'rgba(212,160,23,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                        <span style={{ fontSize: 40 }}>🖊️</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 16 }}>Authentication Required</h1>
                    <p style={{ color: 'rgba(240,235,224,0.4)', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>Sign in to share your knowledge and write articles for the network.</p>
                    <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 0' }}>AUTHENTICATE TO PROCEED</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 100, paddingBottom: 100 }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
                <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,224,0.4)', textDecoration: 'none', marginBottom: 32 }} className="hover-gold">
                    <HiOutlineArrowLeft /> Back to Knowledge Base
                </Link>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', md: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 900, color: '#f0ebe0', marginBottom: 8, letterSpacing: '-0.02em' }}>Write an Article</h1>
                            <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)' }}>Contribute your expertise to the community knowledge base.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <button type="button" style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(240,235,224,0.2)', borderRadius: 12, color: '#f0ebe0', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <HiOutlineSave /> Save Draft
                            </button>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 32px' }}>
                                {loading ? 'Publishing...' : 'Publish Article'}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 40, border: '1px solid rgba(74,158,92,0.15)', display: 'flex', flexDirection: 'column', gap: 40 }}>
                        <div>
                            <label className="label-text">Article Title</label>
                            <input
                                type="text" name="title" required
                                value={formData.title} onChange={handleChange}
                                placeholder="e.g., Mastering Distributed Systems: A Practical Guide"
                                className="input-field"
                                style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: '-0.02em', height: 'auto', padding: '16px 24px' }}
                            />
                        </div>

                        <div>
                            <label className="label-text" style={{ marginBottom: 12, display: 'block' }}>Select Category</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id} type="button"
                                        onClick={() => setFormData({ ...formData, category: cat.name })}
                                        style={{
                                            padding: '8px 20px', borderRadius: 100,
                                            background: formData.category === cat.name ? 'rgba(212,160,23,0.1)' : 'transparent',
                                            border: `1px solid ${formData.category === cat.name ? '#d4a017' : 'rgba(240,235,224,0.1)'}`,
                                            color: formData.category === cat.name ? '#d4a017' : 'rgba(240,235,224,0.5)',
                                            fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s'
                                        }}
                                    >
                                        {cat.icon} {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label-text">Short Excerpt</label>
                            <textarea
                                name="excerpt" required rows={3}
                                value={formData.excerpt} onChange={handleChange}
                                placeholder="Give readers a quick summary of what they'll learn..."
                                className="input-field" style={{ height: 'auto', resize: 'none' }}
                            />
                        </div>

                        <div>
                            <label className="label-text">Cover Image URL</label>
                            <input
                                type="url" name="coverImage"
                                value={formData.coverImage} onChange={handleChange}
                                placeholder="https://images.unsplash.com/your-image-url"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="label-text">Article Content</label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(val) => setFormData({ ...formData, content: val })}
                                placeholder="Use markdown to structure your article. Add code snippets, images, and clear headings..."
                            />
                        </div>

                        <div>
                            <label className="label-text">Tags</label>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                <input
                                    type="text" value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(e))}
                                    placeholder="Add up to 8 tags..."
                                    className="input-field" style={{ paddingRight: 100 }}
                                />
                                <button type="button" onClick={addTag} style={{ position: 'absolute', right: 8, top: 8, height: 32, padding: '0 16px', background: 'rgba(240,235,224,0.1)', color: '#f0ebe0', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
                                    Add Tag
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {formData.tags.map(tag => (
                                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#0e2010', border: '1px solid rgba(74,158,92,0.1)', color: 'rgba(240,235,224,0.6)', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: '#ff5555', cursor: 'pointer', display: 'flex', padding: 0 }}><HiOutlineX size={14} /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
