'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileHeader from '@/components/ProfileHeader';
import ProblemCard from '@/components/ProblemCard';
import ArticleCard from '@/components/ArticleCard';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineUserGroup,
    HiOutlineCube, HiOutlineClock
} from 'react-icons/hi';

export default function ProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useAuth();

    const [profileUser, setProfileUser] = useState(null);
    const [userResources, setUserResources] = useState({ problems: [], articles: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch unified profile payload
                const res = await fetch(`${API_URL}/api/users/profile/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setProfileUser(data.user);
                    setUserResources({
                        problems: data.problems || [],
                        articles: data.articles || []
                    });
                } else {
                    toast.error(data.message || 'Identity not found');
                    router.push('/leaderboard');
                }
            } catch (error) {
                toast.error('Synchronization failed');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProfile();
    }, [id, API_URL, router]);

    const isOwnProfile = currentUser && (id === currentUser._id || id === currentUser.id);

    if (loading) return <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>;
    if (!profileUser) return null;

    const tabs = [
        { id: 'overview', label: 'Nodes', icon: HiOutlineUserGroup },
        { id: 'problems', label: 'Challenges', icon: HiOutlineLightningBolt, count: userResources.problems.length },
        { id: 'articles', label: 'Insights', icon: HiOutlineBookOpen, count: userResources.articles.length },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', padding: '100px 24px 80px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <ProfileHeader
                    user={profileUser}
                    isOwnProfile={isOwnProfile}
                    problemCount={userResources.problems.length}
                    articleCount={userResources.articles.length}
                />

                <div style={{ marginTop: 60 }}>
                    <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(74,158,92,0.1)', marginBottom: 40, overflowX: 'auto', paddingBottom: 1 }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px',
                                    background: activeTab === tab.id ? 'rgba(212,160,23,0.05)' : 'transparent',
                                    border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? '#d4a017' : 'transparent'}`,
                                    color: activeTab === tab.id ? '#d4a017' : 'rgba(240,235,224,0.3)',
                                    fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                                    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                                }}
                            >
                                <tab.icon style={{ fontSize: 16 }} />
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span style={{ fontSize: 10, background: activeTab === tab.id ? '#d4a017' : 'rgba(240,235,224,0.1)', color: activeTab === tab.id ? '#0a1a0d' : 'inherit', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 340px', gap: 48 }}>
                        <div style={{ minWidth: 0 }}>
                            {activeTab === 'overview' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                    <div className="card" style={{ padding: 32 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 900, color: '#f0ebe0', marginBottom: 24, letterSpacing: '0.05em' }}>BIO-TECHNICAL SUMMARY</h3>
                                        <p style={{ color: 'rgba(240,235,224,0.6)', lineHeight: 1.7, fontSize: 15 }}>
                                            {profileUser.bio || 'This explorer has not documented their bio-technical parameters yet.'}
                                        </p>
                                    </div>

                                    <div className="card" style={{ padding: 32 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 900, color: '#f0ebe0', marginBottom: 24, letterSpacing: '0.05em' }}>EXPERTISE CORES</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                            {['System Architecture', 'Ecosystem Integration', 'Harmony Logic'].map(skill => (
                                                <div key={skill} style={{ padding: '8px 16px', background: 'rgba(74,158,92,0.1)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, color: '#6ec47a', fontSize: 12, fontWeight: 800 }}>
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'problems' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    {userResources.problems.length > 0 ? (
                                        userResources.problems.map(p => <ProblemCard key={p._id} problem={p} />)
                                    ) : (
                                        <div style={{ padding: 60, textAlign: 'center', color: 'rgba(240,235,224,0.2)' }}>
                                            <HiOutlineLightningBolt style={{ fontSize: 48, marginBottom: 16, margin: '0 auto' }} />
                                            <p>No active synchronization challenges posted.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'articles' && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                                    {userResources.articles.length > 0 ? (
                                        userResources.articles.map(a => <ArticleCard key={a._id} article={a} />)
                                    ) : (
                                        <div style={{ gridColumn: '1/-1', padding: 60, textAlign: 'center', color: 'rgba(240,235,224,0.2)' }}>
                                            <HiOutlineBookOpen style={{ fontSize: 48, marginBottom: 16, margin: '0 auto' }} />
                                            <p>No technical insights published yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div className="card" style={{ padding: 32 }}>
                                <h3 style={{ fontSize: 13, fontWeight: 900, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.1em', marginBottom: 24 }}>ACCOMPLISHMENTS</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'rgba(110,196,122,0.05)', borderRadius: 16, border: '1px solid rgba(110,196,122,0.1)' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#6ec47a', color: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <HiOutlineCube />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: '#6ec47a' }}>System Pillar</div>
                                            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(110,196,122,0.6)' }}>CONTRIBUTED {userResources.problems.length}+ SOLUTIONS</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'rgba(212,160,23,0.05)', borderRadius: 16, border: '1px solid rgba(212,160,23,0.1)' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#d4a017', color: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <HiOutlineClock />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: '#d4a017' }}>Day One Node</div>
                                            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(212,160,23,0.6)' }}>MEMBER SINCE GENESIS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
