/**
 * @file ProfileHeader.js
 * @description Identity HUD for user profiles.
 * Visualizes the user's Solarpunk aura, evolutionary stage, technical specializations, 
 * and engagement metrics (reputation, artifacts, and node status).
 */

import EvolutionBadge from './EvolutionBadge';
import { HiOutlinePencil, HiOutlineChat, HiOutlineBookOpen, HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineMail, HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';
import { FaGithub, FaGlobe } from 'react-icons/fa';

/**
 * @param {Object} user - The profile owner's data.
 * @param {boolean} isOwnProfile - Flag to enable editing capabilities.
 * @param {number} problemCount - Aggregate of submitted problems.
 * @param {number} articleCount - Aggregate of published articles.
 * @param {Function} onEditClick - Callback for opening the profile sync modal.
 */
export default function ProfileHeader({ user, isOwnProfile = false, problemCount = 0, articleCount = 0, onEditClick }) {
    return (
        <>
            <div style={{ position: 'relative' }}>
                {/* Evolution Aura Overlay: Dynamic radial gradient based on reputation */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 240,
                    background: `radial-gradient(circle at 10% 50%, ${user.reputationPoints > 500 ? 'rgba(212,160,23,0.1)' : 'transparent'} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 1
                }} />

                {/* Cover Pattern - High-fidelity Solarpunk Gradient */}
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

                {/* Profile Information HUD Card */}
                <div className="card" style={{ padding: '32px 48px', marginTop: -80, margin: '-80px 40px 0', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', md: 'row', alignItems: 'flex-end', gap: 32, marginTop: -80 }}>
                        <div style={{ position: 'relative' }}>
                            {/* User Avatar with secureDicebear fallbacks */}
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
                            {/* Evolutionary Rank Indicator */}
                            <div style={{ position: 'absolute', top: -10, right: -10 }}>
                                <EvolutionBadge stage={user.evolutionStage} size={50} />
                            </div>
                            {/* Quick-Edit Action: Only visible on the owner's profile */}
                            {isOwnProfile && (
                                <button onClick={onEditClick} style={{
                                    position: 'absolute', bottom: 12, left: -10,
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

                        {/* Textual Identity Layer */}
                        <div style={{ flex: 1, paddingBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                                <div style={{ minWidth: 200 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', margin: 0 }}>
                                            {user.name}
                                        </h1>
                                        {/* Stage Badge: Semantic text representation */}
                                        <div style={{ background: 'rgba(110,196,122,0.1)', padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(110,196,122,0.2)' }}>
                                            <span style={{ fontSize: 10, fontWeight: 900, color: '#6ec47a', letterSpacing: '0.1em' }}>{user.evolutionStage.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 14, color: '#d4a017', fontWeight: 800, marginBottom: 8 }}>{user.specialization || 'Neural Architect'}</p>
                                    <p style={{ fontSize: 16, color: 'rgba(240,235,224,0.4)', fontWeight: 600 }}>@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                                </div>

                                {/* Connection / Modification Actions */}
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {isOwnProfile ? (
                                        <button onClick={onEditClick} className="btn-primary" style={{ background: 'rgba(240,235,224,0.05)', color: '#f0ebe0', border: '1px solid rgba(240,235,224,0.1)' }}>
                                            Universal Sync
                                        </button>
                                    ) : (
                                        <>
                                            <button className="btn-primary">Connect Node</button>
                                            <button className="btn-primary" style={{ background: 'rgba(240,235,224,0.05)', color: '#f0ebe0', border: '1px solid rgba(240,235,224,0.1)' }}>Pulse</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Geographical & Social Connectivity Grid */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24, color: 'rgba(240,235,224,0.4)', fontSize: 13, fontWeight: 700 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <HiOutlineLocationMarker style={{ color: '#6ec47a' }} />
                                {user.location || 'Mesh Network'}
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

            {/* Core Stats Matrix: Key performance indicators (KPIs) for the Architect */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
                marginTop: 40,
                paddingTop: 32,
                borderTop: '1px solid rgba(74,158,92,0.1)'
            }}>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>EXP (REPUTATION)</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#d4a017' }}>{user.reputationPoints || 10}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>KNOWLEDGE ARTIFACS</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0' }}>{articleCount}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>DATA CHALLENGES</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0' }}>{problemCount}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(240,235,224,0.2)', letterSpacing: '0.1em', marginBottom: 8 }}>NODE STATUS</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6ec47a', fontSize: 14, fontWeight: 800 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ec47a', boxShadow: '0 0 10px #6ec47a' }} />
                        STABLE
                    </div>
                </div>
            </div>
        </>
    );
}
