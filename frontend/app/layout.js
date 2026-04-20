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
                                    background: '#1e293b',
                                    color: '#f8fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #334155',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#10b981',
                                        secondary: '#f8fafc',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#ef4444',
                                        secondary: '#f8fafc',
                                    },
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
