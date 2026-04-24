'use client';

import Link from 'next/link';
import { formatNumber, timeAgo } from '@/lib/utils';
import { HiOutlineHeart, HiOutlineEye, HiOutlineClock, HiOutlineBookmark, HiOutlineArrowRight } from 'react-icons/hi';

export default function ArticleCard({ article }) {
    if (!article) return null;

    return (
        <Link href={`/articles/${article._id || article.id}`} style={{ textDecoration: 'none' }}>
            <div className="card card-hover" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(74,158,92,0.14)'}
            >
                <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge badge-primary">{article.category}</span>
                </div>

                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {article.title}
                </h2>

                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 20, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {article.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(74,158,92,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img
                                src={article.author?.avatar || 'https://api.dicebear.com/8.x/micah/svg?seed=Solarpunk&backgroundColor=0a1a0d'}
                                alt={article.author?.name}
                                style={{ width: 28, height: 28, borderRadius: 8, objectFit: 'cover' }}
                            />
                            <div>
                                <p style={{ fontSize: 12, fontWeight: 700, color: '#f0ebe0', margin: 0 }}>
                                    {article.author?.name || 'Unknown User'}
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(240,235,224,0.3)', fontWeight: 700 }}>
                                <HiOutlineHeart style={{ width: 14 }} /> {formatNumber(article.likes || 0)}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(240,235,224,0.3)', fontWeight: 700 }}>
                                <HiOutlineEye style={{ width: 14 }} /> {formatNumber(article.views || 0)}
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(240,235,224,0.2)', fontWeight: 600 }}>
                            <HiOutlineClock style={{ width: 14 }} /> {article.readTime || 5} min read • {timeAgo(article.createdAt)}
                        </div>
                        <HiOutlineArrowRight style={{ color: '#d4a017', width: 18 }} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
