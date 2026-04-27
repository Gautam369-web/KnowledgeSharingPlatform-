/**
 * @file gamification.js
 * @description The "Architect" Evolution Engine.
 * Manages user progression, point-based rank thresholding, 
 * and dynamic role specialization based on technical activity.
 */

/**
 * Global configuration for Architect evolution stages.
 * Defines the progression curve from a fresh account to an top-tier contributor.
 */
const EVOLUTION_STAGES = [
    { name: 'Dormant Seed', minPoints: 0, color: '#f0ebe0' },
    { name: 'Emergent Sprout', minPoints: 100, color: '#6ec47a' },
    { name: 'Resilient Sapling', minPoints: 500, color: '#4a9e5c' },
    { name: 'Knowledge Tree', minPoints: 1500, color: '#d4a017' },
    { name: 'Solar Architect', minPoints: 5000, color: '#f59e0b' }
];

/**
 * Calculates a user's current evolution stage based on cumulative reputation points.
 * 
 * @param {number} points - Total Reputation EXP earned by the user.
 * @returns {string} - The human-readable name of the rank (e.g., "Knowledge Tree").
 */
const getEvolutionStage = (points) => {
    // We clone and reverse the stages to find the highest threshold the points have crossed.
    const stage = [...EVOLUTION_STAGES].reverse().find(s => points >= s.minPoints);
    return stage ? stage.name : 'Dormant Seed';
};

/**
 * Analyzes user metrics and tags to determine a prestige title/specialization.
 * Adds flavor and identity to high-performing accounts.
 * 
 * @param {number} articlesWritten - Count of published articles.
 * @param {number} problemsSolved - Count of unique technical problems solved.
 * @param {string[]} tags - The most frequent tags used by the user.
 * @returns {string} - A distinctive technical title.
 */
const determineSpecialization = (articlesWritten, problemsSolved, tags = []) => {
    // High Articles, Low Problems -> Researcher personality
    if (articlesWritten > 10 && problemsSolved < 5) return 'Theoretical Master';

    // High Problems, Low Articles -> Practical engineer personality
    if (problemsSolved > 10 && articlesWritten < 5) return 'Elite Debugger';

    // Keyword-based specializations
    if (tags.includes('Security')) return 'Sentinal Sentinel';
    if (tags.includes('Frontend')) return 'Prism Weaver';

    // Default fallback
    return 'Knowledge Node';
};

module.exports = { getEvolutionStage, determineSpecialization, EVOLUTION_STAGES };
