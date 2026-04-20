import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
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
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col antialiased">
                <ThemeProvider>
                    <AuthProvider>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: '#16161a',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(245,158,11,0.25)',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '13px',
                                },
                                success: {
                                    iconTheme: { primary: '#f59e0b', secondary: '#0d0d0f' },
                                },
                                error: {
                                    iconTheme: { primary: '#f87171', secondary: '#0d0d0f' },
                                },
                            }}
                        />
                        <Navbar />
                        <main className="flex-1 pt-16">
                            {children}
                        </main>
                        <Footer />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
