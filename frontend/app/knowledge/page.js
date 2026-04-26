import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { HiOutlineArrowLeft, HiOutlineGlobeAlt } from 'react-icons/hi';

const KnowledgeWeb = dynamic(() => import('@/components/KnowledgeWeb'), {
    ssr: false,
    loading: () => <div className="card p-20 text-center animate-pulse text-[#6ec47a]">INITIALIZING IQ MESH...</div>
});

export default function KnowledgeMapPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: '100px', paddingBottom: '80px' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'rgba(240,235,224,0.4)',
                        textDecoration: 'none',
                        marginBottom: 32
                    }}
                    className="hover-gold"
                >
                    <HiOutlineArrowLeft /> Back to Dashboard
                </Link>

                <div className="responsive-knowledge-grid">
                    <div>
                        <div style={{ marginBottom: 40 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <HiOutlineGlobeAlt style={{ fontSize: 24, color: '#d4a017' }} />
                                <span style={{ color: '#d4a017', fontSize: 12, fontWeight: 900, letterSpacing: '0.1em' }}>KNOWLEDGE TOPOLOGY</span>
                            </div>
                            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#f0ebe0', lineHeight: 1.1, marginBottom: 24 }}>
                                The Global IQ Web
                            </h1>
                            <p style={{ fontSize: 16, color: 'rgba(240,235,224,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
                                Explore the interconnected technical categories of SolveHub. Each node represents a repository of collective intelligence.
                            </p>
                        </div>

                        <KnowledgeWeb />

                        <div style={{ marginTop: 40, padding: 32, background: 'rgba(212,160,23,0.05)', borderRadius: 24, border: '1px solid rgba(212,160,23,0.1)' }}>
                            <h4 style={{ fontSize: 14, fontWeight: 900, color: '#d4a017', marginBottom: 12 }}>SYSTEM LOG: HOW TO NAVIGATE</h4>
                            <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.5)', lineHeight: 1.6 }}>
                                Click on any primary gold node to initiate a deep-dive into that specific category. The connecting green nodes represent technical tags that bridge multiple disciplines. Rotate and zoom to uncover hidden clusters of knowledge.
                            </p>
                        </div>
                    </div>

                    <aside style={{ position: 'sticky', top: 100 }}>
                        <Sidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
}
