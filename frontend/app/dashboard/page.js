'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { timeAgo } from '@/lib/utils';
import {
    HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp,
    HiOutlineUser, HiOutlineStar, HiOutlineFire, HiOutlineArrowRight,
    HiOutlineCheck, HiOutlineClock,
} from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function DashboardPage() {
    const { user, isAuthenticated, refreshUser } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!isAuthenticated || !user) {
                setLoading(false);
                return;
            }

            try {
                // Refresh user data to get latest stats
                await refreshUser();

                // Fetch recent activity from the user's public profile endpoint
                const res = await fetch(`${API_URL}/api/users/profile/${user.id}`);
                const data = await res.json();

                if (res.ok) {
                    const timeline = [];

                    data.problems?.forEach(p => {
                        timeline.push({
                            id: p._id,
                            type: 'problem',
                            icon: HiOutlineLightningBolt,
                            color: '#6ec47a',
                            label: 'Posted a new challenge:',
                            target: p.title,
                            time: p.createdAt,
                            link: `/problems/${p._id}`
                        });
                    });

                    data.articles?.forEach(a => {
                        timeline.push({
                            id: a._id,
                            type: 'article',
                            icon: HiOutlineBookOpen,
                            color: '#34d399',
                            label: 'Published an insight:',
                            target: a.title,
                            time: a.createdAt,
                            link: `/articles/${a._id}`
                        });
                    });

                    // Sort by newest
                    timeline.sort((a, b) => new Date(b.time) - new Date(a.time));

                    // Add milestone activities if no recent manual activities exist
                    if (timeline.length === 0) {
                        setActivities([
                            { id: 'm1', icon: HiOutlineUser, color: '#8ecae6', label: 'Identity Synchronized', target: 'Welcome to the network', time: user.createdAt || Date.now(), link: '#' },
                            { id: 'm2', icon: HiOutlineStar, color: '#d4a017', label: 'Reputation Initialized', target: `${user.reputation || 0} Points`, time: user.createdAt || Date.now(), link: '#' }
                        ]);
                    } else {
                        setActivities(timeline.slice(0, 5)); // Keep latest 5
                    }
                }
            } catch (error) {
                console.error('Dash error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [isAuthenticated, user?.id, API_URL]); // Removed refreshUser from deps to prevent infinite loops

    const stats = [
        { label: 'Problems Contributed', value: user?.problemsPosted ?? 0, icon: HiOutlineLightningBolt, color: '#6ec47a', trend: 'Community active' },
        { label: 'Articles Published', value: user?.articlesWritten ?? 0, icon: HiOutlineBookOpen, color: '#34d399', trend: 'Knowledge shared' },
        { label: 'Network Reputation', value: user?.reputation ?? 0, icon: HiOutlineStar, color: '#d4a017', trend: `Level ${user?.level || 1} Expert` },
        { label: 'Active Streak', value: user?.streak ?? 0, icon: HiOutlineFire, color: '#f87171', trend: 'Keep it burning' },
    ];

    const QUICK = [
        { label: 'Submit Problem', href: '/problems/new', icon: HiOutlineLightningBolt, color: '#d4a017', desc: 'Get expert feedback' },
        { label: 'Write Article', href: '/articles/new', icon: HiOutlineBookOpen, color: '#6ec47a', desc: 'Contribute expertise' },
        { label: 'Leaderboard', href: '/leaderboard', icon: HiOutlineTrendingUp, color: '#34d399', desc: 'Global rankings' },
        { label: 'My Identity', href: `/profile/${user?.id}`, icon: HiOutlineUser, color: '#8ecae6', desc: 'Profile & settings' },
    ];

    if (loading) return <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>;

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <div style={{ maxWidth: 500, width: '100%', background: '#0e2010', border: '1px solid rgba(74,158,92,0.12)', borderRadius: 32, padding: '60px 40px', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, background: 'rgba(212,160,23,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                        <span style={{ fontSize: 40 }}>🔒</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 16 }}>Access Restricted</h1>
                    <p style={{ color: 'rgba(240,235,224,0.4)', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>Sign in to synchronize your technical contributions and view your personalized ecosystem dashboard.</p>
                    <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 0' }}>AUTHENTICATE TO PROCEED</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 80 }}>
            {/* Header Section */}
            <div style={{ background: 'rgba(14,32,16,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(74,158,92,0.1)', padding: '48px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <div style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(212,160,23,0.1)', color: '#d4a017', fontSize: 11, fontWeight: 900, letterSpacing: '0.1em' }}>GUIDE NODE</div>
                            <span style={{ fontSize: 11, color: 'rgba(240,235,224,0.3)', fontWeight: 800 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#f0ebe0', lineHeight: 1, letterSpacing: '-0.02em' }}>
                            Welcome back, <span style={{ color: '#d4a017' }}>{user?.name?.split(' ')[0]}</span>.
                        </h1>
                    </div>
                    <Link href={`/profile/${user?.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', background: 'rgba(212,160,23,0.05)', borderRadius: 20, border: '1px solid rgba(212,160,23,0.1)' }}>
                            <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=u'} alt="" style={{ width: 44, height: 44, borderRadius: 14 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#f0ebe0' }}>{user?.name}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#d4a017' }}>Level {user?.level || 1} Explorer →</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 48 }}>
                    {stats.map((s, i) => (
                        <div key={i} className="card" style={{ padding: 32, border: '1px solid rgba(74,158,92,0.15)', background: 'linear-gradient(135deg, #0e2010 0%, #0a1a0d 100%)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 16, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon style={{ color: s.color, width: 24, height: 24 }} />
                                </div>
                                <div style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em' }}>{s.label.toUpperCase()}</div>
                            </div>
                            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 48, fontWeight: 900, color: '#f0ebe0', marginBottom: 8, lineHeight: 1 }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>{s.trend}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 360px', gap: 48 }}>
                    <div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: '#f0ebe0', marginBottom: 24 }}>System Access</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
                            {QUICK.map((q, i) => (
                                <Link key={i} href={q.href} style={{ textDecoration: 'none' }}>
                                    <div style={{ padding: 24, background: '#0e2010', borderRadius: 24, border: '1px solid rgba(74,158,92,0.12)', transition: 'all 0.3s', cursor: 'pointer' }} className="hover-lift">
                                        <div style={{ width: 44, height: 44, borderRadius: 14, background: `${q.color}10`, color: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                            <q.icon style={{ width: 22, height: 22 }} />
                                        </div>
                                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f0ebe0', marginBottom: 4 }}>{q.label}</h3>
                                        <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', marginBottom: 16 }}>{q.desc}</p>
                                        <HiOutlineArrowRight style={{ color: q.color }} />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Streak Progress */}
                        <div style={{ padding: 32, background: 'rgba(212,160,23,0.03)', borderRadius: 24, border: '1px solid rgba(212,160,23,0.1)', display: 'flex', alignItems: 'center', gap: 24 }}>
                            <div style={{ fontSize: 40 }}>🔥</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#f0ebe0', marginBottom: 8 }}>
                                    You're on a <span style={{ color: '#d4a017', fontSize: 20 }}>{user?.streak || 0} day</span> contribution streak!
                                </div>
                                <div style={{ height: 6, background: 'rgba(74,158,92,0.1)', borderRadius: 10, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${Math.min((user?.streak || 0) * 10, 100)}%`, background: '#d4a017', borderRadius: 10 }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: '#f0ebe0', marginBottom: 24 }}>Synchronization Log</h2>
                        <div style={{ background: '#0e2010', borderRadius: 24, border: '1px solid rgba(74,158,92,0.12)', overflow: 'hidden' }}>
                            {activities.length > 0 ? activities.map((a, i) => (
                                <Link key={a.id} href={a.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ display: 'flex', gap: 16, padding: 24, borderBottom: i < activities.length - 1 ? '1px solid rgba(74,158,92,0.08)' : 'none', transition: 'background 0.2s', cursor: 'pointer' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,158,92,0.02)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}10`, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <a.icon />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.5)', margin: 0, lineHeight: 1.5 }}>
                                                {a.label} <span style={{ color: '#f0ebe0', fontWeight: 700 }}>{a.target}</span>
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: 'rgba(240,235,224,0.25)', fontWeight: 700 }}>
                                                <HiOutlineClock /> {timeAgo(a.time)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )) : (
                                <div style={{ padding: 48, textAlign: 'center' }}>
                                    <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.2)' }}>No recent activity to display.</p>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
