'use client';

import { HiOutlineChartBar, HiOutlineTrendingUp } from 'react-icons/hi';

const MOCK_LEADERS = [
    { rank: 1, name: 'Alex Johnson', reputation: 15420, solved: 234, badge: '🥇', color: '#f59e0b' },
    { rank: 2, name: 'Sarah Chen', reputation: 12800, solved: 189, badge: '🥈', color: '#94a3b8' },
    { rank: 3, name: 'Marcus Webb', reputation: 11200, solved: 156, badge: '🥉', color: '#cd7c2f' },
    { rank: 4, name: 'Yuki Tanaka', reputation: 9800, solved: 134, badge: null, color: '#818cf8' },
    { rank: 5, name: 'Priya Anand', reputation: 8600, solved: 121, badge: null, color: '#34d399' },
    { rank: 6, name: 'David Kim', reputation: 7400, solved: 108, badge: null, color: '#f472b6' },
    { rank: 7, name: 'Elena Russo', reputation: 6900, solved: 97, badge: null, color: '#38bdf8' },
    { rank: 8, name: 'Omar Hassan', reputation: 5800, solved: 84, badge: null, color: '#fb923c' },
];

export default function LeaderboardPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0d0d0f', paddingTop: 88 }}>
            {/* Header */}
            <div style={{ background: '#111114', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px 32px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <HiOutlineChartBar style={{ color: '#f59e0b', width: 20, height: 20 }} />
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f59e0b' }}>LEADERBOARD</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>Top Contributors</h1>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Weekly rankings based on reputation, solutions, and engagement</p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
                {/* Podium top 3 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
                    {MOCK_LEADERS.slice(0, 3).map((u, i) => (
                        <div key={u.rank} style={{
                            background: i === 0 ? 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))' : 'rgba(255,255,255,0.02)',
                            border: i === 0 ? '1px solid rgba(245,158,11,0.35)' : '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, padding: '28px 20px', textAlign: 'center',
                            order: i === 0 ? -1 : i,
                        }}>
                            <div style={{ fontSize: 32, marginBottom: 10 }}>{u.badge}</div>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg,${u.color},${u.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#0d0d0f', margin: '0 auto 12px' }}>
                                {u.name[0]}
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{u.name}</div>
                            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: u.color }}>{u.reputation.toLocaleString()}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', marginTop: 4 }}>REP POINTS</div>
                        </div>
                    ))}
                </div>

                {/* Remaining */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {MOCK_LEADERS.slice(3).map((u) => (
                        <div key={u.rank} className="card" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.25)', width: 28, textAlign: 'center', fontFamily: "'Playfair Display',serif" }}>#{u.rank}</span>
                            <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${u.color},${u.color}70)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#0d0d0f' }}>{u.name[0]}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{u.name}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{u.solved} problems solved</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 900, color: u.color }}>{u.reputation.toLocaleString()}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>POINTS</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
