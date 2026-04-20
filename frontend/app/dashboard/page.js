'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp, HiOutlineUser, HiOutlineStar, HiOutlineFire } from 'react-icons/hi';

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        { label: 'Problems Posted', value: user?.problemsSolved || 0, icon: HiOutlineLightningBolt, color: '#f59e0b' },
        { label: 'Articles Written', value: user?.articlesWritten || 0, icon: HiOutlineBookOpen, color: '#34d399' },
        { label: 'Reputation', value: user?.reputation || 0, icon: HiOutlineStar, color: '#818cf8' },
        { label: 'Day Streak', value: user?.streak || 0, icon: HiOutlineFire, color: '#f87171' },
    ];

    const quickLinks = [
        { label: 'Post a Problem', href: '/problems/new', icon: HiOutlineLightningBolt, color: '#f59e0b' },
        { label: 'Write an Article', href: '/articles/new', icon: HiOutlineBookOpen, color: '#34d399' },
        { label: 'Leaderboard', href: '/leaderboard', icon: HiOutlineTrendingUp, color: '#818cf8' },
        { label: 'View Profile', href: `/profile/${user?.id || user?._id || '1'}`, icon: HiOutlineUser, color: '#f472b6' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0d0d0f', paddingTop: 88 }}>
            {/* Header */}
            <div style={{ background: '#111114', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px 32px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f59e0b', marginBottom: 8 }}>DASHBOARD</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                        Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                    </h1>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Here's your activity overview</p>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
                    {stats.map((s, i) => (
                        <div key={i} className="card" style={{ padding: '24px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon style={{ color: s.color, width: 18, height: 18 }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{s.label.toUpperCase()}</span>
                            </div>
                            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: s.color }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>Quick Actions</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
                    {quickLinks.map((l, i) => (
                        <Link key={i} href={l.href} style={{ textDecoration: 'none' }}>
                            <div className="card card-hover" style={{ padding: '20px', display: 'flex', align: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${l.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <l.icon style={{ color: l.color, width: 20, height: 20 }} />
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', alignSelf: 'center' }}>{l.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Sign in prompt */}
                {!user && (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, marginBottom: 20 }}>You must be signed in to view your dashboard.</p>
                        <Link href="/login" className="btn-primary">SIGN IN</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
