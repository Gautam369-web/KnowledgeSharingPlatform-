'use client';

import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineShieldCheck, HiOutlinePencil } from 'react-icons/hi';
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';

export default function ProfileHeader({ user, isOwnProfile = false, problemCount = 0, articleCount = 0, onEditClick }) {
    return (
        <>
            <div style={{ position: 'relative' }}>
                {/* Cover Pattern - Solarpunk Gradient */}
                <div style={{
                    height: 240,
                    width: '100%',
                    background: 'linear-gradient(135deg, #0a1a0d 0%, #1a3c20 50%, #d4a017 100%)',
                    borderRadius: 40,
                    opacity: 0.8,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                </div>

                {/* Profile Info Card */}
                <div className="card" style={{ padding: '32px 48px', marginTop: -80, margin: '-80px 40px 0', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', md: 'row', alignItems: 'flex-end', gap: 32, marginTop: -80 }}>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={user.avatar || 'https://api.dicebear.com/8.x/micah/svg?seed=Solarpunk&backgroundColor=0a1a0d'}
                                alt={user.name}
                                style={{
                                    width: 160,
                                    height: 160,
                                    borderRadius: 40,
                                    objectFit: 'cover',
                                    border: '6px solid #0e2010',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    background: '#0e2010'
                                }} />
                            {isOwnProfile && (
                                <button onClick={onEditClick} style={{
                                    position: 'absolute', bottom: 12, right: 12,
                                    width: 40, height: 40, borderRadius: 12,
                                    background: '#d4a017', color: '#0a1a0d',
                                    border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'transform 0.2s', boxShadow: '0 4px 10px rgba(212,160,23,0.3)'
                                }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <HiOutlinePencil style={{ fontSize: 20 }} />
                                </button>
                            )}
                        </div>

                        <div style={{ flex: 1, paddingBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                                <div style={{ minWidth: 200 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', margin: 0 }}>
                                            {user.name}
                                        </h1>
                                        <HiOutlineShieldCheck style={{ color: '#d4a017', fontSize: 24 }} title="Verified Guardian" />
                                    </div>
                                    <p style={{ fontSize: 16, color: 'rgba(240,235,224,0.4)', fontWeight: 600 }}>@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                                </div>

                                <div style={{ display: 'flex', gap: 12 }}>
                                    {isOwnProfile ? (
                                        <button onClick={onEditClick} className="btn-primary" style={{ background: 'rgba(240,235,224,0.05)', color: '#f0ebe0', border: '1px solid rgba(240,235,224,0.1)' }}>
                                            Technical Settings
                                        </button>
                                    ) : (
                                        <>
                                            <button className="btn-primary">Connect Node</button>
                                            <button className="btn-primary" style={{ background: 'rgba(240,235,224,0.05)', color: '#f0ebe0', border: '1px solid rgba(240,235,224,0.1)' }}>Signal</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24, color: 'rgba(240,235,224,0.4)', fontSize: 13, fontWeight: 700 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <HiOutlineLocationMarker style={{ color: '#6ec47a' }} />
                                {user.location || 'Distributed Network'}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <HiOutlineCalendar style={{ color: '#6ec47a' }} />
                                Joined {new Date(user.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </span>
                            <div style={{ display: 'flex', gap: 16, marginLeft: 'auto' }}>
                                {user.github && <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontSize: 18 }}><FaGithub /></a>}
                                {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontSize: 18 }}><FaGlobe /></a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
                marginTop: 40,
                paddingTop: 32,
                borderTop: '1px solid rgba(74,158,92,0.1)'
            }}>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>REPUTATION</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#d4a017' }}>{user.reputation}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>SYNCHRONIZATIONS</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0' }}>{problemCount}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>ARTIFACTS</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0' }}>{articleCount}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>NETWORK STATUS</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6ec47a', fontSize: 14, fontWeight: 800 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ec47a', boxShadow: '0 0 10px #6ec47a' }} />
                        ACTIVE
                    </div>
                </div>
            </div>
        </>
    );
}
