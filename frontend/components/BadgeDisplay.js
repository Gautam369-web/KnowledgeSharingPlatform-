'use client';

import {
    HiOutlineAcademicCap, HiOutlineLightningBolt,
    HiOutlineSparkles, HiOutlineCube, HiOutlineGlobeAlt,
    HiOutlineChip, HiOutlineCode, HiOutlineBadgeCheck
} from 'react-icons/hi';

const BADGES = {
    'gold-contributor': { icon: HiOutlineAcademicCap, label: 'Gold Contributor', color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30' },
    'problem-solver': { icon: HiOutlineLightningBolt, label: 'Problem Solver', color: 'text-primary-500 bg-primary-100 dark:bg-primary-900/30' },
    'mentor': { icon: HiOutlineSparkles, label: 'Mentor', color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
    'early-adopter': { icon: HiOutlineGlobeAlt, label: 'Early Adopter', color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30' },
    'ai-expert': { icon: HiOutlineChip, label: 'AI Expert', color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' },
    'top-writer': { icon: HiOutlineCode, label: 'Top Writer', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    'helpful': { icon: HiOutlineBadgeCheck, label: 'Helpful', color: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30' },
    'newcomer': { icon: HiOutlineCube, label: 'Newcomer', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' },
};

export default function BadgeDisplay({ badges, showLabels = false }) {
    return (
        <div className="flex flex-wrap gap-2">
            {badges.map((badgeId) => {
                const badge = BADGES[badgeId] || BADGES['newcomer'];
                const Icon = badge.icon;

                return (
                    <div
                        key={badgeId}
                        className={`inline-flex items-center rounded-xl p-1.5 transition-all 
                      duration-300 hover:scale-110 cursor-help ${showLabels ? `px-3 py-1.5 ${badge.color}` : `bg-slate-100 dark:bg-slate-800`
                            }`}
                        title={badge.label}
                    >
                        <Icon className={`w-5 h-5 ${!showLabels ? badge.color.split(' ')[0] : ''}`} />
                        {showLabels && (
                            <span className="ml-2 text-xs font-bold uppercase tracking-wider">
                                {badge.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
