/**
 * @file EvolutionBadge.js
 * @description Visual representation of a user's Architect evolution stage.
 * Dynamic rendering engine that maps reputation-based ranks to icons, colors, 
 * and ambient glow effects.
 */

'use client';

import { HiOutlineSparkles, HiOutlineCubeTransparent, HiOutlineDatabase, HiOutlineFilter } from 'react-icons/hi';
import { GiOakLeaf, GiSprout, GiRoots, GiCrownedSkull } from 'react-icons/gi';

/**
 * Configuration mapping for evolutionary stages.
 * Defines the visual identity (icon, color, glow) for each rank.
 */
const STAGE_CONFIG = {
    'Dormant Seed': { icon: HiOutlineCubeTransparent, color: '#f0ebe0', glow: 'rgba(240,235,224,0.2)' },
    'Emergent Sprout': { icon: GiSprout, color: '#6ec47a', glow: 'rgba(110,196,122,0.4)' },
    'Resilient Sapling': { icon: GiOakLeaf, color: '#4a9e5c', glow: 'rgba(74,158,92,0.5)' },
    'Knowledge Tree': { icon: HiOutlineDatabase, color: '#d4a017', glow: 'rgba(212,160,23,0.6)' },
    'Solar Architect': { icon: HiOutlineSparkles, color: '#f59e0b', glow: 'rgba(245,158,11,0.8)' }
};

/**
 * @param {string} stage - The evolution stage title (e.g., "Solar Architect").
 * @param {number} size - Pixel dimensions for the badge.
 */
export default function EvolutionBadge({ stage = 'Dormant Seed', size = 40 }) {
    const config = STAGE_CONFIG[stage] || STAGE_CONFIG['Dormant Seed'];
    const Icon = config.icon;

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: size / 3,
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${config.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: config.color,
            boxShadow: `0 0 15px ${config.glow}`, // Ambient bio-luminescent glow
            position: 'relative',
            overflow: 'visible'
        }} title={`Evolution Stage: ${stage}`}>
            <Icon style={{ fontSize: size * 0.6 }} />

            {/* High-Level Pulsing Aura: Triggered for Tree and Architect ranks */}
            {(stage === 'Knowledge Tree' || stage === 'Solar Architect') && (
                <div style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: (size / 3) + 4,
                    border: `1px solid ${config.color}`,
                    opacity: 0.3,
                    animation: 'pulse-glow 2s infinite ease-in-out' // Defined in global CSS
                }} />
            )}
        </div>
    );
}
