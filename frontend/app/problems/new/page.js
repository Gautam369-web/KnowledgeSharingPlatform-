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
    HiOutlineInformationCircle, HiOutlineArrowLeft, HiOutlineCheckCircle
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

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

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
        if (!isAuthenticated) {
            toast.error('You must be signed in to post a question');
            return;
        }

        if (!formData.category) {
            toast.error('Please select a category');
            return;
        }

        if (!formData.description || formData.description.length < 20) {
            toast.error('Description is too short. Please provide more context.');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/problems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Your question has been posted successfully!');
                router.push('/problems');
            } else {
                toast.error(data.message || 'Failed to post question');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Could not connect to the server');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: '#0a1a0d' }}>
                <div style={{ maxWidth: 500, width: '100%', background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: '48px 40px', textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, background: 'rgba(212,160,23,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <HiOutlineInformationCircle style={{ width: 32, height: 32, color: '#d4a017' }} />
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 12 }}>Account Required</h1>
                    <p style={{ color: 'rgba(240,235,224,0.5)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>To maintain the quality of our technical community, please sign in to post your problem.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>SIGN IN TO PROCEED</Link>
                        <Link href="/problems" style={{ color: 'rgba(240,235,224,0.4)', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Back to Problems</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', padding: '100px 24px 60px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Header Section */}
                <div style={{ marginBottom: 48, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
                    <div style={{ flex: 1, minWidth: 300 }}>
                        <Link href="/problems" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#d4a017', fontSize: 12, fontWeight: 800, textDecoration: 'none', letterSpacing: '0.1em', marginBottom: 20 }}>
                            <HiOutlineArrowLeft style={{ width: 14, height: 14 }} /> BACK TO REPOSITORY
                        </Link>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#f0ebe0', lineHeight: 1.1, marginBottom: 16 }}>
                            Submit Technical <span style={{ color: '#d4a017' }}>Question.</span>
                        </h1>
                        <p style={{ fontSize: 16, color: 'rgba(240,235,224,0.4)', maxWidth: 600, lineHeight: 1.6 }}>
                            Contribute to the collective knowledge. Provide clear context and include code snippets where possible for faster expert feedback.
                        </p>
                    </div>

                    <div style={{ display: 'none', lg: 'block', width: 300 }}>
                        <div style={{ background: 'rgba(212,160,23,0.03)', border: '1px solid rgba(212,160,23,0.1)', borderRadius: 16, padding: 24 }}>
                            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, fontWeight: 800, color: '#d4a017', letterSpacing: '0.1em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <HiOutlineLightBulb /> QUICK TIPS
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    'Be specific with the title',
                                    'Explain what you\'ve tried',
                                    'Include error messages',
                                    'Tag with relevant tech'
                                ].map((tip, i) => (
                                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(240,235,224,0.6)' }}>
                                        <HiOutlineCheckCircle style={{ color: '#d4a017', flexShrink: 0, marginTop: 2 }} /> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 340px', gap: 40 }}>

                    {/* Main Form Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                        {/* Title Card */}
                        <div style={{ background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: 32 }}>
                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Question Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., How to implement optimistic UI updates in React with Server Actions?"
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(240,235,224,0.1)', padding: '12px 0', fontSize: 20, fontWeight: 700, color: '#f0ebe0', outline: 'none', transition: 'border-color 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = '#d4a017'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(240,235,224,0.1)'}
                                />
                                <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', marginTop: 12 }}>Imagine you're asking a fellow senior engineer. Be descriptive but concise.</p>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Problem Details</label>
                                <div style={{ background: '#0a1a0d', borderRadius: 16, border: '1px solid rgba(74,158,92,0.1)', overflow: 'hidden' }}>
                                    <RichTextEditor
                                        value={formData.description}
                                        onChange={(val) => setFormData({ ...formData, description: val })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Metadata Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                            <div style={{ background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: 32 }}>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Category</label>
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={{ width: '100%', background: 'rgba(240,235,224,0.03)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none' }}
                                >
                                    <option value="" style={{ background: '#0e2010' }}>Select a focus area...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name} style={{ background: '#0e2010' }}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: 32 }}>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Priority Level</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['low', 'medium', 'high'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, priority: p })}
                                            style={{
                                                flex: 1, padding: '12px 0', borderRadius: 14, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
                                                background: formData.priority === p ? 'rgba(212,160,23,0.1)' : 'rgba(240,235,224,0.03)',
                                                color: formData.priority === p ? '#d4a017' : 'rgba(240,235,224,0.4)',
                                                border: formData.priority === p ? '1px solid #d4a017' : '1px solid rgba(74,158,92,0.16)',
                                                cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tags section */}
                        <div style={{ background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: 32 }}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Technical Tags</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                                {formData.tags.map(tag => (
                                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(212,160,23,0.07)', border: '1px solid rgba(212,160,23,0.2)', color: '#d4a017', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                                        #{tag}
                                        <button onClick={() => removeTag(tag)} style={{ border: 'none', background: 'none', padding: 0, display: 'flex', cursor: 'pointer', color: 'inherit' }}>
                                            <HiOutlineX style={{ width: 14, height: 14 }} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineTag style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 18, height: 18 }} />
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(e))}
                                    placeholder="Add technologies (e.g. react, nodejs)"
                                    style={{ width: '100%', background: 'rgba(240,235,224,0.03)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px 14px 48px', color: '#f0ebe0', fontSize: 14, outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Submit Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div style={{ position: 'sticky', top: 100 }}>
                            <div style={{ background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 24, padding: 32, textAlign: 'center' }}>
                                <div style={{ width: 48, height: 48, background: 'rgba(212,160,23,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                    <HiOutlineLightBulb style={{ width: 24, height: 24, color: '#d4a017' }} />
                                </div>
                                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 800, color: '#f0ebe0', marginBottom: 8 }}>Ready to Post?</h3>
                                <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.4)', lineHeight: 1.6, marginBottom: 32 }}>
                                    Your question will be visible to our network of 12,000+ experts.
                                </p>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '18px 0', justifyContent: 'center' }}
                                >
                                    {loading ? (
                                        <div style={{ width: 20, height: 20, border: '2px solid rgba(10,26,13,0.2)', borderTop: '2px solid #0a1a0d', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                    ) : 'POST QUESTION'}
                                </button>
                                <Link href="/problems" style={{ display: 'block', marginTop: 16, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,224,0.3)', textDecoration: 'none' }}>
                                    Discard draft
                                </Link>
                            </div>

                            <div style={{ marginTop: 24, padding: '0 12px' }}>
                                <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.25)', lineHeight: 1.6 }}>
                                    By posting, you agree to the community guidelines and code of conduct. High-quality questions receive faster responses.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
