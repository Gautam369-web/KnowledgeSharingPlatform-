/**
 * @file KnowledgeWeb.js
 * @description The "IQ Node Matrix" Interactive Topology.
 * Uses `react-force-graph-2d` to render a 2D force-directed graph of the platform's
 * knowledge structure, connecting categories to their associated technical tags.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useRouter } from 'next/navigation';

export default function KnowledgeWeb() {
    const router = useRouter();
    // Graph state: nodes (categories/tags) and links (inter-relations)
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    // Dynamic dimensions for responsive canvas rendering
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const fgRef = useRef();
    const containerRef = useRef();

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    /**
     * Effect: Manage responsive canvas resizing and graph data population.
     */
    useEffect(() => {
        /**
         * Recalculates canvas size based on parent container and viewport width.
         */
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: window.innerWidth < 768 ? 400 : 600
                });
            }
        };

        /**
         * Dispatches a request to the backend graph endpoint to fetch relational nodes.
         */
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/api/articles/stats/graph`);
                const data = await res.json();
                setGraphData(data);
                updateDimensions();
            } catch (error) {
                console.error('Graph fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [API_URL]);

    // Render loading skeleton during node generation
    if (loading) return (
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,26,13,0.5)', borderRadius: 32, border: '1px solid rgba(74,158,92,0.1)' }}>
            <div className="loading-spinner" />
        </div>
    );

    return (
        <div
            ref={containerRef}
            style={{
                height: `${dimensions.height}px`,
                background: '#050c06',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid rgba(110,196,122,0.1)',
                position: 'relative',
                width: '100%'
            }}
        >
            {/* HUD Title Overlay */}
            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, pointerEvents: 'none' }}>
                <h3 style={{ fontSize: 11, fontWeight: 900, color: '#6ec47a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, background: '#6ec47a', borderRadius: '50%', boxShadow: '0 0 10px #6ec47a' }} />
                    IQ Node Matrix
                </h3>
            </div>

            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                nodeLabel="id"
                nodeRelSize={6}
                // Group 1: Core Categories (Gold Orbs) | Group 2: Tech Tags (Green Orbs)
                nodeColor={node => node.group === 1 ? '#d4a017' : '#6ec47a'}
                linkColor={() => 'rgba(110,196,122,0.15)'}
                backgroundColor="#050c06"
                // On-click: Navigate to search results for that specific knowledge node
                onNodeClick={node => {
                    if (node.group === 1) {
                        router.push(`/articles?category=${encodeURIComponent(node.id)}`);
                    }
                }}
                /**
                 * Custom Drawing Logic: High-fidelity node rendering on HTML5 Canvas.
                 * Includes radial gradients, glow effects, and dynamic typography.
                 */
                nodeCanvasObject={(node, ctx, globalScale) => {
                    if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

                    const label = node.id;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${node.group === 1 ? 'bold' : 'normal'} ${fontSize}px "JetBrains Mono"`;

                    // Draw Node Orb (The "Neural Point")
                    const r = (node.val || 2) * 3;
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
                    gradient.addColorStop(0, node.group === 1 ? '#d4a017' : '#6ec47a');
                    gradient.addColorStop(1, 'transparent');

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // Glow Effect (Atmospheric depth)
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = node.group === 1 ? '#d4a017' : '#6ec47a';

                    // Label Rendering (Positioned below the orb)
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = node.group === 1 ? '#f0ebe0' : 'rgba(240,235,224,0.6)';
                    ctx.fillText(label, node.x, node.y + r + 5);

                    ctx.shadowBlur = 0; // Reset shadow to prevent bleeding into links
                }}
                CoH={true} // Cooldown Handling for performance
            />
        </div>
    );
}
