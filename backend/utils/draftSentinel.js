/**
 * @file draftSentinel.js
 * @description The AI-Assisted Drafting Sentinel.
 * Provides real-time technical auditing and structural feedback for article drafts.
 * Acts as a pre-publication quality control layer.
 */

/**
 * Analyzes an article draft and returns tactical feedback and technical metrics.
 * 
 * @param {string} title - The proposed title of the article.
 * @param {string} content - The markdown/HTML content body.
 * @param {string} category - The primary category (e.g., "Full Stack").
 * @param {string[]} tags - Associated metadata tags.
 * @returns {Promise<Object>} - A JSON object containing technical audit results.
 */
const analyzeDraft = async (title, content, category, tags = []) => {
    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        // Handle missing API credentials gracefully
        if (!GROQ_API_KEY) {
            return {
                suggestions: ["Warning: Sentinel Offline. Connect Groq API for tactical analysis."],
                score: 50,
                sentiment: "Neutral"
            };
        }

        // Prompt Engineering: Define the persona and constraints for the LLM.
        // We enforce a strict flat JSON structure to prevent React rendering errors on the frontend.
        const prompt = `
            You are the Solomon Drafting Sentinel, an AI specialized in technical knowledge architecture.
            Analyze this article draft for the SolveHub platform (Solarpunk/Cyberpunk aesthetic).
            
            ARTICLE DATA:
            Title: ${title}
            Category: ${category}
            Tags: ${tags.join(', ')}
            Content Template: ${content.substring(0, 1500)}

            Provide a technical audit in JSON format (FLAT STRINGS ONLY, NO NESTED OBJECTS):
            1. "titleAudit": A single string analyzing clarity and impact.
            2. "structureAudit": A single string analyzing organization.
            3. "solarpunkScore": A number from 1-100.
            4. "seoSuggestions": An array of 3 strings.
            5. "criticalFix": A single string pointing out one improvement.

            Keep responses concise and in the tone of a system diagnostic.
        `;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                response_format: { type: 'json_object' }
            })
        });

        const data = await response.json();
        const analysis = JSON.parse(data.choices[0].message.content);

        // Security Layer: Synchronize with the global moderation engine.
        // This ensures authors receive immediate warnings for toxicity before they attempt to publish.
        const { scanContent } = require('./moderation');
        const securityResult = await scanContent(`${title} ${content}`);

        if (!securityResult.isSafe) {
            analysis.securityWarning = "CRITICAL: Inappropriate content detected. This draft will be BLOCKED if you attempt to publish it.";
            analysis.detectedIssues = securityResult.detected;
        }

        return analysis;
    } catch (error) {
        console.error('Draft Sentinel Error:', error);
        return { error: "Diagnostic failure in Sentinel link." };
    }
};

module.exports = { analyzeDraft };
