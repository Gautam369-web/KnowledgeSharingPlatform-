'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { notifications as mockNotifications } from '@/lib/data';
import {
    HiOutlineMenu, HiOutlineX, HiOutlineBell,
    HiOutlinePlus, HiOutlineSearch, HiOutlineMoon,
    HiOutlineSun, HiOutlineLogout, HiOutlineUser,
    HiOutlineCog, HiOutlineChartBar, HiOutlineBookOpen,
    HiOutlineLightBulb, HiOutlineTrendingUp, HiOutlineHome,
} from 'react-icons/hi';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    const unreadCount = mockNotifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setShowNotifications(false);
        setShowProfile(false);
    }, [pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { href: '/', label: 'Home', icon: HiOutlineHome },
        { href: '/problems', label: 'Problems', icon: HiOutlineLightBulb },
        { href: '/articles', label: 'Articles', icon: HiOutlineBookOpen },
        { href: '/leaderboard', label: 'Leaderboard', icon: HiOutlineTrendingUp },
    ];

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg shadow-slate-900/5'
                : 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-purple-600 
                          rounded-xl flex items-center justify-center shadow-lg 
                          shadow-primary-500/30 group-hover:shadow-primary-500/50 
                          transition-all duration-300 group-hover:scale-110">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 
                           to-purple-600 bg-clip-text text-transparent hidden sm:block">
                            SolveHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl 
                            text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2">
                        {/* Search toggle */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 
                       dark:hover:bg-slate-800 dark:text-slate-400 
                       transition-colors duration-200"
                        >
                            <HiOutlineSearch className="w-5 h-5" />
                        </button>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 
                       dark:hover:bg-slate-800 dark:text-slate-400 
                       transition-colors duration-200"
                        >
                            {theme === 'dark' ? (
                                <HiOutlineSun className="w-5 h-5" />
                            ) : (
                                <HiOutlineMoon className="w-5 h-5" />
                            )}
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* Post Problem Button */}
                                <Link
                                    href="/problems/new"
                                    className="hidden sm:flex items-center space-x-1.5 px-4 py-2 
                           bg-gradient-to-r from-primary-600 to-purple-600 
                           text-white text-sm font-semibold rounded-xl 
                           hover:from-primary-700 hover:to-purple-700 
                           transition-all duration-300 shadow-md 
                           shadow-primary-500/25 hover:shadow-lg 
                           hover:shadow-primary-500/30"
                                >
                                    <HiOutlinePlus className="w-4 h-4" />
                                    <span>Ask Question</span>
                                </Link>

                                {/* Notifications */}
                                <div ref={notifRef} className="relative">
                                    <button
                                        onClick={() => {
                                            setShowNotifications(!showNotifications);
                                            setShowProfile(false);
                                        }}
                                        className="relative p-2 rounded-xl text-slate-500 
                             hover:bg-slate-100 dark:hover:bg-slate-800 
                             dark:text-slate-400 transition-colors duration-200"
                                    >
                                        <HiOutlineBell className="w-5 h-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 
                                     bg-red-500 text-white text-xs font-bold 
                                     rounded-full flex items-center justify-center 
                                     animate-pulse">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Notification Dropdown */}
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 
                                  rounded-2xl shadow-2xl border border-slate-200 
                                  dark:border-slate-700 overflow-hidden animate-slide-down">
                                            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    Notifications
                                                </h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {mockNotifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className={`p-4 border-b border-slate-100 
                                      dark:border-slate-800 hover:bg-slate-50 
                                      dark:hover:bg-slate-800 cursor-pointer 
                                      transition-colors ${!notif.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                                                            }`}
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-primary-500' : 'bg-transparent'
                                                                }`} />
                                                            <div>
                                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                                    {notif.message}
                                                                </p>
                                                                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                                                <button className="w-full text-center text-sm text-primary-600 
                                         dark:text-primary-400 font-medium hover:underline">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div ref={profileRef} className="relative">
                                    <button
                                        onClick={() => {
                                            setShowProfile(!showProfile);
                                            setShowNotifications(false);
                                        }}
                                        className="flex items-center space-x-2 p-1 rounded-xl 
                             hover:bg-slate-100 dark:hover:bg-slate-800 
                             transition-colors duration-200"
                                    >
                                        <img
                                            src={user?.avatar}
                                            alt={user?.name}
                                            className="w-8 h-8 rounded-lg object-cover ring-2 
                               ring-primary-200 dark:ring-primary-800"
                                        />
                                    </button>

                                    {showProfile && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 
                                  rounded-2xl shadow-2xl border border-slate-200 
                                  dark:border-slate-700 overflow-hidden animate-slide-down">
                                            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={user?.avatar}
                                                        alt={user?.name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                                            {user?.name}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{user?.email}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center space-x-2">
                                                    <span className="badge-primary text-xs">
                                                        ⭐ {user?.reputation?.toLocaleString()} rep
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    href={`/profile/${user?.id}`}
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                                                >
                                                    <HiOutlineUser className="w-4 h-4" />
                                                    <span>My Profile</span>
                                                </Link>
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                                                >
                                                    <HiOutlineChartBar className="w-4 h-4" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                                                >
                                                    <HiOutlineCog className="w-4 h-4" />
                                                    <span>Settings</span>
                                                </Link>
                                            </div>
                                            <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                                                <button
                                                    onClick={logout}
                                                    className="flex items-center space-x-3 px-3 py-2 w-full 
                                   rounded-lg text-red-600 dark:text-red-400 
                                   hover:bg-red-50 dark:hover:bg-red-900/20 
                                   transition-colors text-sm"
                                                >
                                                    <HiOutlineLogout className="w-4 h-4" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link href="/login" className="btn-ghost text-sm">
                                    Sign In
                                </Link>
                                <Link href="/register" className="btn-primary text-sm !px-4 !py-2">
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-xl text-slate-500 
                       hover:bg-slate-100 dark:hover:bg-slate-800 
                       transition-colors duration-200"
                        >
                            {isOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Search Bar (expandable) */}
                {showSearch && (
                    <div className="pb-4 animate-slide-down">
                        <form onSubmit={handleSearch} className="relative">
                            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search problems, articles, users..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 
                         rounded-xl border-0 focus:outline-none focus:ring-2 
                         focus:ring-primary-500 text-slate-900 dark:text-white 
                         placeholder:text-slate-400"
                                autoFocus
                            />
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-slate-950 border-t 
                      border-slate-200 dark:border-slate-800 animate-slide-down">
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl 
                            text-sm font-medium transition-all ${isActive(link.href)
                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/problems/new"
                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl 
                           bg-primary-600 text-white text-sm font-semibold"
                                >
                                    <HiOutlinePlus className="w-5 h-5" />
                                    <span>Ask a Question</span>
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl 
                           text-slate-600 dark:text-slate-400 text-sm font-medium 
                           hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <HiOutlineChartBar className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </Link>
                            </>
                        ) : (
                            <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
                                <Link href="/login" className="block w-full btn-secondary text-center text-sm">
                                    Sign In
                                </Link>
                                <Link href="/register" className="block w-full btn-primary text-center text-sm">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
