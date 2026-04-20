import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'SolveHub - Knowledge Sharing Platform for Problem Solving',
    description: 'A collaborative platform where communities come together to solve problems, share knowledge, and grow together.',
    keywords: 'knowledge sharing, problem solving, collaboration, Q&A, community',
    authors: [{ name: 'SolveHub Team' }],
    openGraph: {
        title: 'SolveHub - Knowledge Sharing Platform',
        description: 'Collaborative problem-solving platform',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0, background: '#0a1a0d', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AuthProvider>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#152c18',
                                color: '#fff',
                                borderRadius: '10px',
                                border: '1px solid rgba(212,160,23,0.25)',
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: '13px',
                            },
                            success: {
                                iconTheme: { primary: '#d4a017', secondary: '#0a1a0d' },
                            },
                            error: {
                                iconTheme: { primary: '#f87171', secondary: '#0a1a0d' },
                            },
                        }}
                    />
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
