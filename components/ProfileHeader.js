'use client';

import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineLink } from 'react-icons/hi';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import BadgeDisplay from '@/components/BadgeDisplay';
import { formatNumber } from '@/lib/utils';

export default function ProfileHeader({ user, isOwnProfile = false }) {
    return (
        <div className="relative">
            {/* Cover Pattern */}
            <div className="h-48 w-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl" />

            {/* Profile Info Card */}
            <div className="card p-6 sm:p-8 -mt-16 mx-4 sm:mx-8 relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-8 -mt-20 sm:-mt-24 mb-6">
                    <div className="relative group">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 
                       border-white dark:border-slate-900 shadow-xl"
                        />
                        {isOwnProfile && (
                            <button className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 
                               group-hover:opacity-100 transition-opacity flex 
                               items-center justify-center text-white text-xs font-bold">
                                Change Photo
                            </button>
                        )}
                    </div>

                    <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {user.name}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    {user.bio || 'No bio provided yet.'}
                                </p>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                {isOwnProfile ? (
                                    <button className="btn-secondary text-sm">Edit Profile</button>
                                ) : (
                                    <>
                                        <button className="btn-primary text-sm !py-2">Follow</button>
                                        <button className="btn-secondary text-sm !py-2">Message</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6 text-sm text-slate-500">
                            {user.location && (
                                <span className="flex items-center">
                                    <HiOutlineLocationMarker className="w-4 h-4 mr-1.5" />
                                    {user.location}
                                </span>
                            )}
                            <span className="flex items-center">
                                <HiOutlineCalendar className="w-4 h-4 mr-1.5" />
                                Joined {new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </span>
                            {user.website && (
                                <a href={user.website} target="_blank" rel="noopener" className="flex items-center hover:text-primary-600">
                                    <HiOutlineLink className="w-4 h-4 mr-1.5" />
                                    Portfolio
                                </a>
                            )}
                            <div className="flex items-center space-x-3 ml-auto pt-4 sm:pt-0">
                                <a href={`https://github.com/${user.github}`} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary-600 transition-all">
                                    <FaGithub className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary-600 transition-all">
                                    <FaTwitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Reputation</p>
                        <p className="text-2xl font-bold text-primary-600">{formatNumber(user.reputation)}</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Solved</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.problemsSolved}</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Articles</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.articlesWritten}</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Badges</p>
                        <div className="mt-1">
                            <BadgeDisplay badges={user.badges || []} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
