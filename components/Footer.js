import Link from 'next/link';
import {
    HiOutlineLightBulb, HiOutlineBookOpen,
    HiOutlineTrendingUp, HiOutlineHeart,
} from 'react-icons/hi';
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    const footerLinks = {
        Platform: [
            { label: 'Problems', href: '/problems' },
            { label: 'Articles', href: '/articles' },
            { label: 'Leaderboard', href: '/leaderboard' },
            { label: 'Categories', href: '/categories' },
        ],
        Community: [
            { label: 'Guidelines', href: '/guidelines' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Blog', href: '/blog' },
            { label: 'Events', href: '/events' },
        ],
        Company: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' },
            { label: 'Press', href: '/press' },
        ],
        Legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'DMCA', href: '/dmca' },
        ],
    };

    const socialLinks = [
        { icon: FaGithub, href: '#', label: 'GitHub' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaDiscord, href: '#', label: 'Discord' },
        { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t 
                      border-slate-800 mt-20">
            {/* Top section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 
                            rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-2xl font-bold text-white">SolveHub</span>
                        </Link>
                        <p className="text-sm text-slate-500 mb-6 max-w-xs">
                            A collaborative platform where communities come together to solve
                            problems, share knowledge, and grow together.
                        </p>
                        <div className="flex items-center space-x-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-xl bg-slate-800 flex items-center 
                           justify-center text-slate-400 hover:bg-primary-600 
                           hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-500 hover:text-primary-400 
                                transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} SolveHub. All rights reserved.
                        </p>
                        <p className="text-sm text-slate-500 flex items-center">
                            Made with <HiOutlineHeart className="w-4 h-4 text-red-500 mx-1" />
                            for the community
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
