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
    HiOutlineShare, HiOutlineChatAlt2, HiOutlineArrowLeft,
    HiOutlineSparkles, HiOutlineTerminal, HiOutlineX
} from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function ArticleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [summarizing, setSummarizing] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowingLoading, setIsFollowingLoading] = useState(false);
    const { toggleFollow } = useAuth();

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

    useEffect(() => {
        if (user && article?.author) {
            const authorId = article.author._id || article.author.id;
            setIsFollowing(user.following?.includes(authorId));
        }
    }, [user, article]);

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

    const handleSummarize = async () => {
        if (!isAuthenticated) return toast.error('Sign in to decrypt metadata');
        setSummarizing(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/articles/${id}/summarize`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setSummary(data);
                toast.success('Neural Link Established');
            } else {
                toast.error('Failed to decrypt data');
            }
        } catch (error) {
            toast.error('Connection severed');
        } finally {
            setSummarizing(false);
        }
    };

    const handleFollowToggle = async () => {
        if (!isAuthenticated) {
            toast.error('Sign in to connect with other nodes.');
            return;
        }

        const authorId = article.author._id || article.author.id;
        setIsFollowingLoading(true);
        try {
            const token = localStorage.getItem('token');
            const endpoint = isFollowing ? `/api/users/unfollow/${authorId}` : `/api/users/follow/${authorId}`;
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                toggleFollow(authorId);
                setIsFollowing(!isFollowing);
                toast.success(isFollowing ? 'Node disconnected successfully' : 'Node connected successfully');
            } else {
                toast.error(data.message || 'Action failed');
            }
        } catch (error) {
            toast.error('Network error during connection transition');
        } finally {
            setIsFollowingLoading(false);
        }
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 60 }}>
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

                            <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 40, boxShadow: '0 20px 48px rgba(0,0,0,0.2)', maxWidth: '900px' }}>
                                <img
                                    src={article.coverImage}
                                    alt={article.title}
                                    style={{ width: '100%', aspectRatio: '21/9', maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </div>

                            {/* AI TL;DR Section */}
                            <div style={{ marginBottom: 48, position: 'relative' }}>
                                {!summary ? (
                                    <button
                                        onClick={handleSummarize}
                                        disabled={summarizing}
                                        style={{
                                            width: '100%',
                                            padding: '24px',
                                            background: 'rgba(212,160,23,0.05)',
                                            border: '1px dashed rgba(212,160,23,0.3)',
                                            borderRadius: 24,
                                            color: '#d4a017',
                                            fontSize: 14,
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 12,
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="hover-glow"
                                    >
                                        <HiOutlineSparkles style={{ fontSize: 20 }} />
                                        {summarizing ? 'SYNCING WITH GROQ NEURAL NODE...' : 'ACTIVATE GROQ AI TL;DR'}
                                    </button>
                                ) : (
                                    <div style={{
                                        background: '#050c06',
                                        border: '1px solid #1a3c1e',
                                        borderRadius: 24,
                                        padding: '32px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                    }}>
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                            background: 'linear-gradient(90deg, transparent, #6ec47a, transparent)',
                                            animation: 'scanline 2s linear infinite'
                                        }} />

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                            <div style={{ padding: 8, background: 'rgba(110,196,122,0.1)', borderRadius: 8, color: '#6ec47a' }}>
                                                <HiOutlineTerminal style={{ fontSize: 20 }} />
                                            </div>
                                            <span style={{ fontSize: 11, fontWeight: 900, color: '#6ec47a', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                                Groq Llama-3 - Intelligence Stream Decrypted
                                            </span>
                                            <button
                                                onClick={() => setSummary(null)}
                                                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(110,196,122,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                                                className="hover-gold"
                                            >
                                                <HiOutlineX style={{ fontSize: 18 }} />
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                            {summary.summary?.map((pt, i) => (
                                                <div key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#f0ebe0', lineHeight: 1.6 }}>
                                                    <span style={{ color: '#6ec47a', fontWeight: 900 }}>{`0${i + 1}.`}</span>
                                                    <p style={{ margin: 0 }}>{pt}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {summary.keywords?.map(k => (
                                                <span key={k} style={{ fontSize: 9, fontWeight: 900, color: '#6ec47a', padding: '4px 8px', background: 'rgba(110,196,122,0.05)', borderRadius: 6, border: '1px solid rgba(110,196,122,0.1)', textTransform: 'uppercase' }}>
                                                    #{k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                                <button
                                    className={`btn-primary ${isFollowing ? 'following' : ''}`}
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: isFollowing ? 'rgba(212,160,23,0.1)' : '#d4a017',
                                        color: isFollowing ? '#d4a017' : '#0a1a0d',
                                        border: isFollowing ? '1px solid rgba(212,160,23,0.3)' : 'none'
                                    }}
                                    onClick={handleFollowToggle}
                                    disabled={isFollowingLoading}
                                >
                                    {isFollowingLoading ? '...' : (isFollowing ? 'CONNECTED' : 'FOLLOW EXPERT')}
                                </button>
                            </div>
                            <Sidebar />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
