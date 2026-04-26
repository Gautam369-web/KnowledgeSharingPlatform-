const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const VULGAR_WORDS = [
    'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'cunt', 'dick', 'pussy',
    'faggot', 'nigger', 'retard', 'slut', 'whore', 'phuck', 'phucking'
];

/**
 * Scans content for vulgarity and inappropriate language.
 * Combines pattern matching with Semantic AI analysis via Groq.
 */
const scanContent = async (text) => {
    if (!text) return { isSafe: true, detected: [] };

    const detected = [];
    const lowercaseText = text.toLowerCase();

    // LAYER 1: Fast Pattern Matching (Fast & Offline)
    VULGAR_WORDS.forEach(word => {
        if (lowercaseText.includes(word)) detected.push(word);
    });

    const maskedPatterns = [
        /[f|ph][u|*|v|0|i][c|k|q][k|i|1|n]*/i,
        /sh[i|*|1|!]t/i
    ];

    maskedPatterns.forEach(pattern => {
        if (pattern.test(text) && !detected.includes('inappropriate_pattern')) {
            detected.push('inappropriate_pattern');
        }
    });

    // LAYER 2: Semantic AI Analysis (Deep & Contextual)
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey && apiKey !== 'your_groq_api_key_here' && detected.length === 0) {
        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        {
                            role: 'system',
                            content: 'Analyze text for toxicity, sexual content, or severe vulgarity. If unsafe, return JSON: { "isSafe": false, "reason": "toxicity/vulgarity" }. If safe, return { "isSafe": true }.'
                        },
                        {
                            role: 'user',
                            content: `Analyze: ${text.slice(0, 2000)}`
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            });

            if (response.ok) {
                const result = await response.json();
                const aiSafety = JSON.parse(result.choices[0].message.content);
                if (!aiSafety.isSafe) {
                    detected.push(`ai_flagged_${aiSafety.reason}`);
                }
            }
        } catch (error) {
            console.error('Groq Moderation Error:', error);
        }
    }

    return {
        isSafe: detected.length === 0,
        detected: detected
    };
};

module.exports = { scanContent };
