'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp,
    HiOutlineUser, HiOutlineStar, HiOutlineFire, HiOutlineArrowRight,
    HiOutlineCheck, HiOutlineClock,
} from 'react-icons/hi';

const ACTIVITY = [
    { icon: HiOutlineCheck, color: '#34d399', label: 'You solved', target: 'React Hydration Mismatch', time: '2h ago' },
    { icon: HiOutlineBookOpen, color: '#818cf8', label: 'You published', target: 'Understanding JWT Refresh', time: '1d ago' },
    { icon: HiOutlineStar, color: '#f59e0b', label: 'Earned badge', target: 'Gold Contributor 🥇', time: '2d ago' },
    { icon: HiOutlineFire, color: '#f87171', label: 'Streak extended —', target: '7-day streak 🔥', time: '3d ago' },
];

const QUICK = [
    { label: 'Post a Problem', href: '/problems/new', icon: HiOutlineLightningBolt, color: '#f59e0b', desc: 'Get community help' },
    { label: 'Write an Article', href: '/articles/new', icon: HiOutlineBookOpen, color: '#34d399', desc: 'Share your knowledge' },
    { label: 'View Leaderboard', href: '/leaderboard', icon: HiOutlineTrendingUp, color: '#818cf8', desc: 'See top contributors' },
    { label: 'Your Profile', href: '/profile/1', icon: HiOutlineUser, color: '#f472b6', desc: 'Edit & share profile' },
];

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        { label: 'Problems Posted', value: user?.problemsSolved ?? 42, icon: HiOutlineLightningBolt, color: '#f59e0b', trend: '+5 this week' },
        { label: 'Articles Written', value: user?.articlesWritten ?? 12, icon: HiOutlineBookOpen, color: '#34d399', trend: '+2 this week' },
        { label: 'Reputation', value: user?.reputation ?? 4820, icon: HiOutlineStar, color: '#818cf8', trend: '+340 this week' },
        { label: 'Day Streak', value: user?.streak ?? 7, icon: HiOutlineFire, color: '#f87171', trend: 'Keep it going!' },
    ];

    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#0d0d0f', paddingTop: 88, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>🔒</div>
                    <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Sign in to access your dashboard</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 28, fontSize: 15 }}>Track your progress, reputation, and contributions.</p>
                    <Link href="/login" style={{ background: '#f59e0b', color: '#0d0d0f', fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontFamily: "'Bricolage Grotesque',sans-serif", letterSpacing: '0.04em' }}>
                        SIGN IN →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0d0d0f', paddingTop: 60 }}>

            {/* ── Page Header ── */}
            <div style={{ background: '#111114', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '36px 24px 28px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#f59e0b', marginBottom: 6 }}>DASHBOARD</p>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                            Welcome back, <em style={{ color: '#f59e0b', fontStyle: 'italic' }}>{user.name?.split(' ')[0] || 'Explorer'}</em>
                        </h1>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Here's your activity overview · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <Link href={`/profile/${user.id || user._id || '1'}`} style={{
                        display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
                        background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: 12, padding: '10px 18px',
                    }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color: '#0d0d0f', fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                            {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{user.name}</div>
                            <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>View profile →</div>
                        </div>
                    </Link>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

                {/* ── Stats Row ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 32 }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            background: '#111114', border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, padding: '24px 22px',
                            transition: 'border-color 0.25s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = `${s.color}40`}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon style={{ color: s.color, width: 19, height: 19 }} />
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>{s.label.toUpperCase()}</span>
                            </div>
                            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 40, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>{s.value.toLocaleString()}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{s.trend}</div>
                        </div>
                    ))}
                </div>

                {/* ── Two-column lower ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }} className="dashboard-grid">

                    {/* Quick Actions */}
                    <div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>Quick Actions</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                            {QUICK.map((q, i) => (
                                <Link key={i} href={q.href} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: '#111114', border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10,
                                        transition: 'border-color 0.25s, transform 0.25s', cursor: 'pointer',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${q.color}40`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${q.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <q.icon style={{ color: q.color, width: 20, height: 20 }} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{q.label}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{q.desc}</div>
                                        </div>
                                        <HiOutlineArrowRight style={{ color: q.color, width: 16, height: 16, marginTop: 4 }} />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Streak bar */}
                        <div style={{ background: '#111114', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ fontSize: 36 }}>🔥</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, color: '#f59e0b' }}>{user?.streak || 7}</span>-day streak going!
                                </div>
                                <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${Math.min((user?.streak || 7) / 30 * 100, 100)}%`, background: 'linear-gradient(90deg,#f87171,#f59e0b)', borderRadius: 3, transition: 'width 0.5s' }} />
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Keep solving daily to maintain your streak</div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>Recent Activity</h2>
                        <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
                            {ACTIVITY.map((a, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 14,
                                    padding: '16px 20px',
                                    borderBottom: i < ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                        <a.icon style={{ color: a.color, width: 14, height: 14 }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>
                                            {a.label} <span style={{ color: '#fff', fontWeight: 600 }}>{a.target}</span>
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                            <HiOutlineClock style={{ width: 11, color: 'rgba(255,255,255,0.25)' }} />
                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{a.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive fix for dashboard grid */}
            <style>{`
                @media (max-width: 768px) {
                    .dashboard-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
