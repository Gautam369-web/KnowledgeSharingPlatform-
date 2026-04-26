/**
 * Gamification Utility
 * Handles level-up logic and evolution stages for the "Architect" system.
 */

const EVOLUTION_STAGES = [
    { name: 'Dormant Seed', minPoints: 0, color: '#f0ebe0' },
    { name: 'Emergent Sprout', minPoints: 100, color: '#6ec47a' },
    { name: 'Resilient Sapling', minPoints: 500, color: '#4a9e5c' },
    { name: 'Knowledge Tree', minPoints: 1500, color: '#d4a017' },
    { name: 'Solar Architect', minPoints: 5000, color: '#f59e0b' }
];

/**
 * Calculates the evolution stage based on reputation points.
 * @param {number} points - Total reputation points.
 * @returns {string} - The name of the stage.
 */
const getEvolutionStage = (points) => {
    const stage = [...EVOLUTION_STAGES].reverse().find(s => points >= s.minPoints);
    return stage ? stage.name : 'Dormant Seed';
};

/**
 * Determines a user specialization based on their tags/categories.
 * (Simple implementation for now, in a real app this would analyze real stats).
 */
const determineSpecialization = (articlesWritten, problemsSolved, tags = []) => {
    if (articlesWritten > 10 && problemsSolved < 5) return 'Theoretical Master';
    if (problemsSolved > 10 && articlesWritten < 5) return 'Elite Debugger';
    if (tags.includes('Security')) return 'Sentinal Sentinel';
    if (tags.includes('Frontend')) return 'Prism Weaver';
    return 'Knowledge Node';
};

module.exports = { getEvolutionStage, determineSpecialization, EVOLUTION_STAGES };
