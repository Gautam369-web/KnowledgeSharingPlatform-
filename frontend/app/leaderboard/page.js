'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function LeaderboardPage() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/leaderboard`);
                const data = await res.json();
                if (res.ok) {
                    setLeaders(data);
                }
            } catch (error) {
                toast.error('Failed to load rankings');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, [API_URL]);

    if (loading) return <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>;

    const topThree = leaders.slice(0, 3);
    const others = leaders.slice(3);

    const getBadgeColor = (rank) => {
        if (rank === 1) return '#d4a017';
        if (rank === 2) return '#94a3b8';
        if (rank === 3) return '#cd7c2f';
        return 'rgba(240,235,224,0.3)';
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 100 }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(212,160,23,0.1)', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
                        <HiOutlineTrendingUp style={{ color: '#d4a017' }} />
                        <span style={{ fontSize: 11, fontWeight: 900, color: '#d4a017', letterSpacing: '0.1em' }}>GLOBAL RANKINGS</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#f0ebe0', marginBottom: 20, letterSpacing: '-0.03em' }}>
                        The Solarpunk <span style={{ color: '#d4a017' }}>Council</span>
                    </h1>
                    <p style={{ fontSize: 18, color: 'rgba(240,235,224,0.4)', maxWidth: 600, margin: '0 auto' }}>Honoring the guardians of knowledge who strengthen our technical ecosystem.</p>
                </div>

                {topThree.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48, alignItems: 'end' }}>
                        {topThree.map((u, i) => {
                            const rank = i + 1;
                            const isFirst = rank === 1;
                            const color = getBadgeColor(rank);
                            return (
                                <div key={u._id} style={{
                                    background: isFirst ? 'rgba(212,160,23,0.05)' : '#0e2010',
                                    border: `1px solid ${isFirst ? 'rgba(212,160,23,0.2)' : 'rgba(74,158,92,0.12)'}`,
                                    borderRadius: 32, padding: isFirst ? '48px 32px' : '32px',
                                    textAlign: 'center', order: isFirst ? -1 : rank,
                                    position: 'relative'
                                }}>
                                    <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', fontSize: 48 }}>
                                        {rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉'}
                                    </div>
                                    <img src={u.avatar} style={{ width: isFirst ? 96 : 72, height: isFirst ? 96 : 72, borderRadius: 24, objectFit: 'cover', border: `3px solid ${color}`, marginBottom: 20, margin: '0 auto 20px' }} />
                                    <h3 style={{ fontSize: isFirst ? 22 : 18, fontWeight: 800, color: '#f0ebe0', marginBottom: 8 }}>{u.name}</h3>
                                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: isFirst ? 36 : 28, fontWeight: 900, color: color, lineHeight: 1 }}>{u.reputation}</div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginTop: 8 }}>REPUTATION</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 100 }}>
                    {others.map((u, i) => (
                        <div key={u._id} className="card hover-lift" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
                            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 900, color: 'rgba(240,235,224,0.2)', width: 32 }}>#{i + 4}</span>
                            <img src={u.avatar} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#f0ebe0' }}>{u.name}</div>
                                <div style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', fontWeight: 700 }}>{u.problemsSolved} problems solved</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 900, color: '#6ec47a' }}>{u.reputation}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.05em' }}>POINTS</div>
                            </div>
                        </div>
                    ))}
                    {leaders.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(240,235,224,0.2)' }}>
                            <HiOutlineShieldCheck style={{ fontSize: 64, marginBottom: 20, margin: '0 auto' }} />
                            <p>No contributors found in this sector yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

