/**
 * AI Summarizer Utility
 * Simulates an AI-driven summarization engine for technical articles.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Summarizes text content using Groq Llama-3.
 * Fallback to heuristic logic if API fails or key is missing.
 */
const generateSummary = async (content) => {
    if (!content) return { summary: ['No content to analyze.'], keywords: [] };

    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey && apiKey !== 'your_groq_api_key_here') {
        try {
            const cleanText = content.replace(/<[^>]*>?/gm, ' ').slice(0, 4000); // Limit to 4k chars

            console.log('Sending request to Groq Cloud...');
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
                console.log('Groq Response Received ✅');
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
            // Fallback continues below
        }
    }

    // --- FALLBACK HEURISTIC LOGIC ---
    const cleanText = content.replace(/<[^>]*>?/gm, ' ');
    const sentences = cleanText.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 20);
    const resultSentences = [sentences[0] || 'Technical analysis in progress.'];

    const KEYWORDS = ['react', 'node', 'api', 'javascript', 'backend'];
    const keywordsFound = KEYWORDS.filter(k => cleanText.toLowerCase().includes(k));

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
