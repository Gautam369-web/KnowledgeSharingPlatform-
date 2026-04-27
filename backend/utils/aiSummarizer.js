/**
 * @file aiSummarizer.js
 * @description AI-Driven Technical Article Summarizer.
 * Leverages Groq Cloud (Llama-3.3) for semantic distillation or falls back 
 * to a structural heuristic engine if the API is unavailable.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Summarizes long-form technical content into a digestible TL;DR.
 * Extracts 3 core points and relevant technical keywords.
 * 
 * @param {string} content - The raw article content (HTML or Plaintext).
 * @returns {Promise<{summary: string[], keywords: string[], engine: string, readabilityScore: number}>}
 */
const generateSummary = async (content) => {
    // Basic validation: prevents empty inputs from reaching the AI layer
    if (!content) return { summary: ['No content to analyze.'], keywords: [] };

    const apiKey = process.env.GROQ_API_KEY;

    // LAYER 1: Deep LLM Analysis (Preferred Path)
    // Uses Llama-3.3-70b for high-fidelity semantic extraction.
    if (apiKey && apiKey !== 'your_groq_api_key_here') {
        try {
            // Strip HTML tags and limit length to manage token efficiency and latency
            const cleanText = content.replace(/<[^>]*>?/gm, ' ').slice(0, 4000);

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
                            content: 'You are a technical summarizer. Provide a TL;DR summary in exactly 3 bullet points. Also provide top 5 technical keywords. Format as JSON: { "summary": ["pt1", "pt2", "pt3"], "keywords": ["k1", "k2", "k3", "k4", "k5"] }'
                        },
                        {
                            role: 'user',
                            content: `Summarize this technical article: ${cleanText}`
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            });

            if (response.ok) {
                const data = await response.json();
                const aiResult = JSON.parse(data.choices[0].message.content);
                return {
                    ...aiResult,
                    engine: 'Groq-Llama3',
                    readabilityScore: 95
                };
            } else {
                const errorData = await response.text();
                console.error('Groq API Error Status:', response.status, errorData);
            }
        } catch (error) {
            console.error('Groq API Error:', error);
            // If API fails, execution naturally falls through to the Heuristic Layer for zero-downtime support
        }
    }

    // LAYER 2: Heuristic Fallback (Zero-Downtime / Offline Support)
    // Uses structural analysis (First, Middle, Last sentence extraction) 
    // to provide a basic summary without calling external APIs.
    const cleanText = content.replace(/<[^>]*>?/gm, ' ');
    const sentences = cleanText.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 20);

    // Heuristic: The first sentence often holds the primary definition/goal.
    const resultSentences = [sentences[0] || 'Technical analysis in progress.'];

    // Keyword matching against a local technical dictionary (Greedy Matching)
    const KEYWORDS = ['react', 'node', 'api', 'javascript', 'backend', 'security', 'frontend', 'database'];
    const keywordsFound = KEYWORDS.filter(k => cleanText.toLowerCase().includes(k));

    // Heuristic: Extract middle and final points for structural coverage of the document body
    if (sentences.length > 2) resultSentences.push(sentences[Math.floor(sentences.length / 2)]);
    if (sentences.length > 3) resultSentences.push(sentences[sentences.length - 1]);

    return {
        summary: resultSentences.slice(0, 3),
        keywords: keywordsFound.slice(0, 5),
        engine: 'Heuristic-Engine',
        readabilityScore: 85
    };
};

module.exports = { generateSummary };
