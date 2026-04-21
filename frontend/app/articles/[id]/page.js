'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { timeAgo, formatNumber } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import CommentSection from '@/components/CommentSection';
import TagBadge from '@/components/TagBadge';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiOutlineClock, HiOutlineHeart, HiOutlineBookmark,
    HiOutlineShare, HiOutlineChatAlt2, HiOutlineArrowLeft
} from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function ArticleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const fetchArticle = async () => {
        try {
            const res = await fetch(`${API_URL}/api/articles/${id}`);
            const data = await res.json();
            if (res.ok) {
                setArticle(data);
            } else {
                toast.error(data.message || 'Article not found');
                router.push('/articles');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Could not connect to the server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchArticle();
    }, [id, API_URL]);

    const handleLike = async () => {
        if (!isAuthenticated) return toast.error('Sign in to like');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/articles/${id}/like`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setArticle(prev => ({ ...prev, likes: data.likes }));
                toast.success('Added to favorites');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to like');
            }
        } catch (error) {
            toast.error('Connection error');
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
    };

    if (loading) return <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>;
    if (!article) return null;

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', padding: '100px 24px 80px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <Link
                    href="/articles"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,224,0.4)', textDecoration: 'none', marginBottom: 32 }}
                    className="hover-gold"
                >
                    <HiOutlineArrowLeft /> Back to Articles
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 320px', gap: 60, alignItems: 'start' }}>
                    <article style={{ minWidth: 0 }}>
                        <div style={{ marginBottom: 40 }}>
                            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 100, background: 'rgba(212,160,23,0.1)', color: '#d4a017', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                                {article.category}
                            </span>
                            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#f0ebe0', marginBottom: 32, lineHeight: 1.1 }}>
                                {article.title}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderTop: '1px solid rgba(74,158,92,0.12)', borderBottom: '1px solid rgba(74,158,92,0.12)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <Link href={`/profile/${article.author?._id}`}>
                                        <img
                                            src={article.author?.avatar}
                                            alt=""
                                            style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }}
                                        />
                                    </Link>
                                    <div>
                                        <Link href={`/profile/${article.author?._id}`} style={{ fontWeight: 800, color: '#f0ebe0', textDecoration: 'none' }}>
                                            {article.author?.name}
                                        </Link>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(240,235,224,0.3)', fontWeight: 700 }}>
                                            <span>{article.readTime || 5} min read</span>
                                            <span>•</span>
                                            <span>{timeAgo(article.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,235,224,0.3)' }}><FaTwitter /></button>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,235,224,0.3)' }}><FaLinkedin /></button>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderRadius: 40, overflow: 'hidden', marginBottom: 48, boxShadow: '0 32px 64px rgba(0,0,0,0.3)' }}>
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                            />
                        </div>

                        <div style={{ fontSize: 18, color: 'rgba(240,235,224,0.8)', lineHeight: 1.8, marginBottom: 48 }} dangerouslySetInnerHTML={{ __html: article.content }} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
                            {article.tags?.map(tag => (
                                <TagBadge key={tag} tag={tag} />
                            ))}
                        </div>

                        <div style={{ padding: 24, background: 'rgba(74,158,92,0.05)', borderRadius: 32, border: '1px solid rgba(74,158,92,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60 }}>
                            <div style={{ display: 'flex', gap: 32 }}>
                                <button onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(240,235,224,0.5)', fontWeight: 800 }}>
                                    <HiOutlineHeart style={{ fontSize: 24, color: '#ff5555' }} />
                                    <span>{article.likes} Likes</span>
                                </button>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(240,235,224,0.5)', fontWeight: 800 }}>
                                    <HiOutlineChatAlt2 style={{ fontSize: 24 }} />
                                    <span>{article.comments || 0} Comments</span>
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={handleShare} style={{ width: 44, height: 44, borderRadius: 14, background: '#0e2010', border: '1px solid rgba(74,158,92,0.1)', color: '#f0ebe0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <HiOutlineShare />
                                </button>
                                <button style={{ width: 44, height: 44, borderRadius: 14, background: '#0e2010', border: '1px solid rgba(74,158,92,0.1)', color: '#f0ebe0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <HiOutlineBookmark />
                                </button>
                            </div>
                        </div>

                        <div style={{ paddingTop: 48, borderTop: '1px solid rgba(74,158,92,0.12)' }}>
                            <CommentSection
                                comments={article.commentsList || []}
                                parentId={article._id}
                                parentType="article"
                            />
                        </div>
                    </article>

                    <aside style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div className="card" style={{ padding: 32 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 900, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.1em', marginBottom: 24 }}>ABOUT THE AUTHOR</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                <img src={article.author?.avatar} style={{ width: 64, height: 64, borderRadius: 16 }} />
                                <div>
                                    <h4 style={{ fontSize: 18, fontWeight: 800, color: '#f0ebe0', marginBottom: 4 }}>{article.author?.name}</h4>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: '#d4a017' }}>OPTIMIST GUIDE</p>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.4)', lineHeight: 1.6, marginBottom: 24 }}>
                                Dedicated to exploring technical solutions that harmonize humanity and nature.
                            </p>
                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>FOLLOW EXPERT</button>
                        </div>
                        <Sidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
}
