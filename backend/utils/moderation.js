/**
 * @file moderation.js
 * @description The SolveHub Security Sentinel. Implements a dual-layer moderation 
 * strategy combining fast regex pattern matching with deep semantic LLM analysis.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * List of globally prohibited terms for immediate Layer 1 blocking.
 */
const VULGAR_WORDS = [
    'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'cunt', 'dick', 'pussy',
    'faggot', 'nigger', 'retard', 'slut', 'whore', 'phuck', 'phucking'
];

/**
 * Scans content for vulgarity and inappropriate language.
 * 
 * @param {string} text - The raw content to scan (Title + Content + Excerpt).
 * @returns {Promise<{isSafe: boolean, detected: string[]}>} - Safety report.
 */
const scanContent = async (text) => {
    // Graceful exit for empty content: prevents unnecessary API overhead
    if (!text) return { isSafe: true, detected: [] };

    const detected = [];
    const lowercaseText = text.toLowerCase();

    // LAYER 1: Fast Pattern Matching (Fast & Offline)
    // Directly checks for inclusion of explicitly prohibited terms.
    VULGAR_WORDS.forEach(word => {
        if (lowercaseText.includes(word)) detected.push(word);
    });

    // LAYER 1.5: Regex Masking Detection (Evasion Protection)
    // Catches common bypass attempts (sh*t, d!ck) using case-insensitive boundaries.
    const maskedPatterns = [
        /\b[f|ph][u|*|v|0|i][c|k|q][k|i|1|n]*\b/i,
        /\bsh[i|*|1|!]t\b/i
    ];

    maskedPatterns.forEach(pattern => {
        if (pattern.test(text) && !detected.includes('inappropriate_pattern')) {
            detected.push('inappropriate_pattern');
        }
    });

    // LAYER 2: Semantic AI Analysis (Deep & Contextual)
    // Uses Llama-3.3-70b to differentiate between technical context (e.g., "kill process") 
    // and genuine toxicity, harassment, or non-technical vulgarity.
    const apiKey = process.env.GROQ_API_KEY;

    // Only trigger AI scan if API is configured and Layer 1 did not already block it.
    if (apiKey && apiKey !== 'your_groq_api_key_here' && detected.length === 0) {
        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a strict technical content moderator. Analyze text for ANY malicious intent, mild to severe toxicity, harassment, vulgarity, or explicit sexual content. Ignore technical terminology, code snippets, or common technical jargon. If UNSAFE (even if borderline), return JSON: { "isSafe": false, "reason": "toxicity/vulgarity" }. If completely safe, return { "isSafe": true }.'
                        },
                        {
                            role: 'user',
                            content: `Analyze: ${text.slice(0, 3000)}` // Slice to protect token limits
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            });

            if (response.ok) {
                const result = await response.json();
                const aiSafety = JSON.parse(result.choices[0].message.content);

                // Log safety status to backend console for security audit trails
                console.log(`🛡️ Sentinel Analysis [AI]: ${aiSafety.isSafe ? 'SAFE' : 'FLAGGED - ' + aiSafety.reason}`);

                if (!aiSafety.isSafe) {
                    detected.push(`ai_flagged_${aiSafety.reason}`);
                }
            } else {
                console.error(`🛡️ Sentinel Analysis [ERROR]: Groq API returned ${response.status}`);
            }
        } catch (error) {
            console.error('🛡️ Sentinel Analysis [CRITICAL]:', error.message);
        }
    }

    // Final security logging for audit: Tracks all flagged attempts.
    if (detected.length > 0) {
        console.warn(`🛡️ Sentinel Blocking Content: [${detected.join(', ')}]`);
    }

    return {
        isSafe: detected.length === 0,
        detected: detected
    };
};

module.exports = { scanContent };
