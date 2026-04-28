'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────
   Tiny animation helper  (CSS-only, no deps)
───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
    return (
        <div
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'both',
            }}
            className={`animate-fade-up ${className}`}
        >
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────
   Inline keyframes injected once
───────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);     }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-fade-up   { animation: fade-up 0.7s cubic-bezier(.22,1,.36,1) both; }
  .animate-float     { animation: float 4s ease-in-out infinite; }
  .animate-shimmer   { animation: shimmer 3s linear infinite; }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
`;

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */


const FEATURES = [
    {
        icon: '◈',
        title: 'Problem Forge',
        body: 'Post complex problems with rich markdown. Tag domains, set priority, and watch experts race to solve them.',
        accent: '#d4a017',
    },
    {
        icon: '⬡',
        title: 'Knowledge Graph',
        body: 'Articles and solutions are automatically linked. Navigate a live web of interconnected knowledge.',
        accent: '#34d399',
    },
    {
        icon: '◎',
        title: 'Expert Radar',
        body: 'Our reputation engine surfaces the best contributors. Every vote, solution, and article builds your standing.',
        accent: '#818cf8',
    },
    {
        icon: '◆',
        title: 'Verified Answers',
        body: 'Peer-reviewed, community-accepted. No noise — only battle-tested solutions that actually work.',
        accent: '#f472b6',
    },
    {
        icon: '⬢',
        title: 'Real-time Threads',
        body: 'Rich comment threads with inline code highlighting, nested replies, and instant notifications.',
        accent: '#38bdf8',
    },
    {
        icon: '●',
        title: 'Streak Streaks',
        body: 'Gamified daily engagement. Build solving streaks, unlock badges, and climb the weekly leaderboard.',
        accent: '#fb923c',
    },
];

const PLANS = [
    {
        name: 'Observer',
        price: 'Free',
        period: '',
        desc: 'Read the knowledge, lurk in discussions.',
        cta: 'Get Started',
        ctaStyle: 'border',
        perks: ['Browse all articles', 'Read solutions', '3 monthly upvotes', 'Basic profile'],
    },
    {
        name: 'Contributor',
        price: '$9',
        period: '/ mo',
        desc: 'Post, solve, and build your reputation.',
        cta: 'Start for Free',
        ctaStyle: 'solid',
        featured: true,
        perks: ['Post problems & solutions', 'Unlimited upvotes', 'Verified badge', 'Analytics dashboard', 'Priority support'],
    },
    {
        name: 'Enterprise',
        price: '$49',
        period: '/ mo',
        desc: 'Private knowledge bases for your team.',
        cta: 'Contact Sales',
        ctaStyle: 'border',
        perks: ['Private workspaces', 'SSO & audit logs', 'Custom roles', 'Dedicated CSM', 'SLA guarantee'],
    },
];

const TESTIMONIALS = [
    {
        quote: "We replaced three internal wikis with SolveHub. Our engineers now spend 40 % less time hunting for answers.",
        name: 'Priya Anand',
        role: 'Engineering Lead · Stripe',
        avatar: 'PA',
        color: '#d4a017',
    },
    {
        quote: "The reputation system is addictive. Our team genuinely competes to be the most helpful — and our code quality shows it.",
        name: 'Marcus Webb',
        role: 'CTO · Finlo',
        avatar: 'MW',
        color: '#34d399',
    },
    {
        quote: "I've tried Stack Overflow Teams, Notion, Confluence. Nothing comes close to the speed of finding verified answers here.",
        name: 'Yuki Tanaka',
        role: 'Staff Engineer · Mercari',
        avatar: 'YT',
        color: '#818cf8',
    },
];

const STATS = [
    { value: '47K+', label: 'Problems Solved' },
    { value: '12K+', label: 'Active Experts' },
    { value: '890K+', label: 'Knowledge Articles' },
    { value: '99.9%', label: 'Uptime SLA' },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function LandingPage() {
    const [statsData, setStatsData] = useState({
        problemsSolved: '47K+',
        activeExperts: '12K+',
        knowledgeArticles: '890K+',
        uptime: '99.9%'
    });

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const formatStat = (num) => {
        if (typeof num === 'string') return num;
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
        return num.toString();
    };

    useEffect(() => {
        const fetchGlobalStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/global-stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStatsData(data);
                }
            } catch (error) {
                console.error('Failed to load global stats');
            }
        };
        fetchGlobalStats();
    }, [API_URL]);

    const STAT_LIST = [
        { value: formatStat(statsData.problemsSolved), label: 'Problems Solved' },
        { value: formatStat(statsData.activeExperts), label: 'Active Experts' },
        { value: formatStat(statsData.knowledgeArticles), label: 'Knowledge Articles' },
        { value: statsData.uptime, label: 'Uptime SLA' },
    ];

    return (
        <>
            {/* Inject keyframes */}
            <style>{KEYFRAMES}</style>

            <div
                className="min-h-screen text-white"
                style={{ background: '#0a1a0d', fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
                {/* ══════════════════════════
                    HERO
                ══════════════════════════ */}
                <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                    {/* Grid background */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: `
                          linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }} />
                    {/* Radial glow */}
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
                        width: 700, height: 700, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    {/* Spinning ring */}
                    <div style={{
                        position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
                        width: 500, height: 500, borderRadius: '50%',
                        border: '1px solid rgba(212,160,23,0.08)',
                    }} className="animate-spin-slow" />

                    <div style={{ maxWidth: 820, position: 'relative', zIndex: 1 }}>
                        <FadeUp delay={0}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)',
                                borderRadius: 100, padding: '6px 16px', marginBottom: 32,
                                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#d4a017',
                            }}>
                                <span style={{ width: 6, height: 6, background: '#d4a017', borderRadius: '50%', display: 'inline-block' }} />
                                NOW IN OPEN BETA · 12,000+ EXPERTS JOINED
                            </div>
                        </FadeUp>

                        <FadeUp delay={80}>
                            <h1 style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: 'clamp(48px,8vw,88px)',
                                fontWeight: 900,
                                lineHeight: 1.06,
                                letterSpacing: '-0.02em',
                                marginBottom: 28,
                                color: '#fff',
                            }}>
                                Where Hard Problems<br />
                                <em style={{
                                    fontStyle: 'italic',
                                    background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }} className="animate-shimmer">
                                    Find Great Answers
                                </em>
                            </h1>
                        </FadeUp>

                        <FadeUp delay={160}>
                            <p style={{
                                fontSize: 'clamp(16px,2.2vw,20px)',
                                color: 'rgba(255,255,255,0.50)',
                                maxWidth: 560, margin: '0 auto 44px',
                                lineHeight: 1.7,
                            }}>
                                A collaborative knowledge platform for engineers, researchers, and problem-solvers. Post challenges, discover solutions, and build expertise that compounds.
                            </p>
                        </FadeUp>

                        <FadeUp delay={240}>
                            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/register" style={{
                                    background: '#d4a017', color: '#0a1a0d',
                                    fontWeight: 800, fontSize: 15, letterSpacing: '0.04em',
                                    padding: '14px 32px', borderRadius: 10, textDecoration: 'none',
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#d4a017'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    JOIN FOR FREE →
                                </Link>
                                <Link href="/problems" style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontWeight: 700, fontSize: 15,
                                    padding: '14px 32px', borderRadius: 10, textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.4)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                                >
                                    EXPLORE PROBLEMS
                                </Link>
                            </div>
                        </FadeUp>
                    </div>

                    {/* Floating stat strip */}
                    <FadeUp delay={360}>
                        <div style={{
                            position: 'relative', zIndex: 1, marginTop: 80,
                            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
                            gap: 1, background: 'rgba(212,160,23,0.12)',
                            border: '1px solid rgba(212,160,23,0.18)',
                            borderRadius: 14, overflow: 'hidden',
                            maxWidth: 700, width: '100%',
                        }}>
                            {STAT_LIST.map((s, i) => (
                                <div key={i} style={{
                                    padding: '20px 16px', textAlign: 'center',
                                    background: 'rgba(13,13,15,0.7)',
                                }}>
                                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 900, color: '#d4a017', letterSpacing: '-0.03em' }}>{s.value}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', marginTop: 4 }}>{s.label.toUpperCase()}</div>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </section>

                {/* ══════════════════════════
                    FEATURES
                ══════════════════════════ */}
                <section id="features" style={{ padding: '120px 24px', background: '#0e2010' }}>
                    <div style={{ maxWidth: 1120, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 72 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#d4a017', marginBottom: 16 }}>PLATFORM CAPABILITIES</p>
                            <h2 style={{
                                fontFamily: "'Bricolage Grotesque',sans-serif",
                                fontSize: 'clamp(36px,5vw,56px)',
                                fontWeight: 900, color: '#fff',
                                letterSpacing: '-0.02em', lineHeight: 1.1,
                            }}>
                                Built for depth,<br /><em>not breadth</em>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
                            {FEATURES.map((f, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(74,158,92,0.14)',
                                        borderRadius: 16, padding: '32px 28px',
                                        transition: 'border-color 0.3s, transform 0.3s',
                                        cursor: 'default',
                                        animationDelay: `${i * 60}ms`,
                                        animationFillMode: 'both',
                                    }}
                                    className="animate-fade-up"
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.accent}40`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,158,92,0.14)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    <div style={{
                                        fontSize: 28, marginBottom: 18,
                                        color: f.accent, lineHeight: 1,
                                        filter: `drop-shadow(0 0 12px ${f.accent}60)`,
                                    }}>{f.icon}</div>
                                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{f.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════
                    SHOWCASE BAND
                ══════════════════════════ */}
                <section id="showcase" style={{ padding: '100px 24px', background: '#0a1a0d', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'linear-gradient(135deg,rgba(212,160,23,0.05) 0%,transparent 60%)',
                    }} />
                    <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                        {/* Text */}
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#d4a017', marginBottom: 16 }}>HOW IT WORKS</p>
                            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 24 }}>
                                A living,<br /><em>breathing</em><br />knowledge base
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
                                Every solution gets upvoted, verified, and linked to related topics. The knowledge grows richer the more your team uses it — no dead wiki pages, no stale Confluence docs.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {['Post a problem with context and tags', 'Experts submit verified solutions', 'Community upvotes the best answers', 'Knowledge is indexed and searchable'].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                        <div style={{
                                            minWidth: 28, height: 28, borderRadius: '50%',
                                            background: 'rgba(212,160,23,0.15)',
                                            border: '1px solid rgba(212,160,23,0.35)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 11, fontWeight: 800, color: '#d4a017',
                                        }}>{i + 1}</div>
                                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, paddingTop: 4 }}>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual card mockup */}
                        <div style={{ position: 'relative' }} className="animate-float">
                            <div style={{
                                background: '#152c18', border: '1px solid rgba(212,160,23,0.2)',
                                borderRadius: 20, padding: 28, fontFamily: "'JetBrains Mono',monospace",
                            }}>
                                <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                                    {['#f47067', '#f5c261', '#57cc84'].map((c, i) => (
                                        <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                                    ))}
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>// Recently solved</div>
                                <div style={{ fontSize: 13, color: '#d4a017', marginBottom: 6 }}>{">"} Optimizing React re-renders at scale</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>14 solutions · 2.3k views · 12 min ago</div>
                                <div style={{ width: '100%', height: 1, background: 'rgba(74,158,92,0.12)', marginBottom: 16 }} />
                                <div style={{ fontSize: 13, color: '#34d399', marginBottom: 6 }}>{">"} JWT refresh token race conditions</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>7 solutions · 890 views · 1 hr ago</div>
                                <div style={{ width: '100%', height: 1, background: 'rgba(74,158,92,0.12)', marginBottom: 16 }} />
                                <div style={{ fontSize: 13, color: '#818cf8', marginBottom: 6 }}>{">"} PostgreSQL query plan regression</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>22 solutions · 5.1k views · 3 hr ago</div>
                                <div style={{
                                    marginTop: 24,
                                    background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)',
                                    borderRadius: 8, padding: '10px 14px', fontSize: 11, color: '#d4a017',
                                    letterSpacing: '0.04em',
                                }}>
                                    ✓  VERIFIED BY 340 ENGINEERS
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════
                    PRICING
                ══════════════════════════ */}
                <section id="pricing" style={{ padding: '120px 24px', background: '#0e2010' }}>
                    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 72 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#d4a017', marginBottom: 16 }}>TRANSPARENT PRICING</p>
                            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                                Simple. No surprises.
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
                            {PLANS.map((plan, i) => (
                                <div key={i} style={{
                                    background: plan.featured ? 'rgba(212,160,23,0.06)' : 'rgba(255,255,255,0.02)',
                                    border: plan.featured ? '1px solid rgba(212,160,23,0.4)' : '1px solid rgba(74,158,92,0.14)',
                                    borderRadius: 20, padding: '36px 28px',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {plan.featured && (
                                        <div style={{
                                            position: 'absolute', top: 16, right: 16,
                                            background: '#d4a017', color: '#0a1a0d',
                                            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                                            padding: '3px 10px', borderRadius: 100,
                                        }}>POPULAR</div>
                                    )}
                                    <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: 12 }}>{plan.name.toUpperCase()}</p>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
                                        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{plan.price}</span>
                                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', paddingBottom: 6 }}>{plan.period}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28, lineHeight: 1.6 }}>{plan.desc}</p>
                                    <Link
                                        href="/register"
                                        style={{
                                            display: 'block', textAlign: 'center', textDecoration: 'none',
                                            padding: '12px 0', borderRadius: 10, fontWeight: 800, fontSize: 13, letterSpacing: '0.05em',
                                            marginBottom: 28,
                                            ...(plan.ctaStyle === 'solid'
                                                ? { background: '#d4a017', color: '#0a1a0d' }
                                                : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }),
                                        }}
                                    >
                                        {plan.cta.toUpperCase()}
                                    </Link>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {plan.perks.map((perk, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                                                <span style={{ color: '#d4a017', fontSize: 16, lineHeight: 1 }}>✦</span> {perk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════
                    TESTIMONIALS
                ══════════════════════════ */}
                <section id="testimonials" style={{ padding: '120px 24px', background: '#0a1a0d' }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 72 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#d4a017', marginBottom: 16 }}>SOCIAL PROOF</p>
                            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                                Teams who ship faster
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(74,158,92,0.14)',
                                    borderRadius: 18, padding: '32px 28px',
                                    position: 'relative',
                                }}>
                                    <div style={{ fontSize: 40, fontFamily: "'Bricolage Grotesque',sans-serif", color: t.color, lineHeight: 1, marginBottom: 16, opacity: 0.7 }}>"</div>
                                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic' }}>
                                        {t.quote}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: '50%',
                                            background: `linear-gradient(135deg,${t.color},${t.color}90)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 13, fontWeight: 800, color: '#0a1a0d',
                                        }}>{t.avatar}</div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════
                    CTA
                ══════════════════════════ */}
                <section style={{ padding: '80px 24px 120px', background: '#0e2010' }}>
                    <div style={{
                        maxWidth: 860, margin: '0 auto', textAlign: 'center',
                        background: 'linear-gradient(135deg,rgba(212,160,23,0.08) 0%,rgba(212,160,23,0.03) 100%)',
                        border: '1px solid rgba(212,160,23,0.25)',
                        borderRadius: 28, padding: '72px 40px',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        {/* Corner glow */}
                        <div style={{
                            position: 'absolute', top: -80, right: -80,
                            width: 300, height: 300, borderRadius: '50%',
                            background: 'radial-gradient(circle,rgba(212,160,23,0.15) 0%,transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#d4a017', marginBottom: 20 }}>START TODAY · FREE FOREVER</p>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
                            Stop searching.<br /><em>Start solving.</em>
                        </h2>
                        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.7 }}>
                            Join 12,000+ engineers already compounding their knowledge daily on SolveHub.
                        </p>
                        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/register" style={{
                                background: '#d4a017', color: '#0a1a0d',
                                fontWeight: 800, fontSize: 15, letterSpacing: '0.05em',
                                padding: '15px 36px', borderRadius: 10, textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#d4a017'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                CREATE FREE ACCOUNT →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════
                    FOOTER
                ══════════════════════════ */}
                <footer style={{
                    borderTop: '1px solid rgba(74,158,92,0.12)',
                    padding: '40px 24px', background: '#0a1a0d',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: '#d4a017',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 900, fontSize: 14, color: '#0a1a0d',
                        }}>S</div>
                        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>SolveHub</span>
                    </div>
                    <div style={{ display: 'flex', gap: 28 }}>
                        {['Privacy', 'Terms', 'GitHub', 'Contact'].map(l => (
                            <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = '#d4a017'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                            >{l.toUpperCase()}</a>
                        ))}
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>© 2026 SOLVEHUB · ALL RIGHTS RESERVED</p>
                </footer>
            </div>
        </>
    );
}
