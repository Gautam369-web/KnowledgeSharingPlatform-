/**
 * @file DraftingSentinel.js
 * @description Frontend interface for the Solomon AI Diagnostic tool.
 * Provides a real-time HUD for article quality, Solarpunk aesthetic scoring, 
 * security warnings, and structural audits.
 */

'use client';

import { useState } from 'react';
import { HiOutlineLightningBolt, HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineSparkles } from 'react-icons/hi';

/**
 * @param {Object} analysis - The results from the Groq-powered AI diagnostic.
 * @param {Function} onAnalyze - Trigger for re-initializing the neural scan.
 * @param {boolean} loading - State of the backend inference process.
 */
export default function DraftingSentinel({ analysis, onAnalyze, loading }) {
    // Idle State: Displayed before the first scan is initialized
    if (!analysis && !loading) {
        return (
            <div className="card p-6 border-dashed border-[rgba(212,160,23,0.3)] text-center">
                <HiOutlineSparkles className="mx-auto text-3xl text-[#d4a017] mb-4 opacity-50" />
                <h4 className="text-[#f0ebe0] font-bold mb-2">Sentinel Diagnostic Idle</h4>
                <p className="text-xs text-[rgba(240,235,224,0.4)] mb-6">Connect to the Solomon AI link to analyze your knowledge artifact.</p>
                <button
                    onClick={onAnalyze}
                    className="btn-primary w-full py-3 text-[10px] tracking-widest"
                    style={{ background: 'rgba(212,160,23,0.1)', color: '#d4a017', border: '1px solid #d4a017' }}
                >
                    INITIALIZE SCAN
                </button>
            </div>
        );
    }

    // Loading State: Implements a "scanning" animation for aesthetic feedback
    if (loading) {
        return (
            <div className="card p-8 border-[#6ec47a] overflow-hidden relative">
                <div style={{ position: 'absolute', top: 0, left: 0, height: 2, background: '#6ec47a', width: '100%', animation: 'scanline 2s infinite linear' }} />
                <div className="text-center">
                    <div className="loading-spinner mx-auto mb-4" />
                    <p className="text-[10px] font-black tracking-widest text-[#6ec47a] animate-pulse">ANALYZING NEURAL DRAFT...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-[rgba(212,160,23,0.2)] overflow-hidden">
            {/* Header: Displays the Solarpunk IQ Score */}
            <div style={{ padding: '16px 24px', background: 'rgba(212,160,23,0.05)', borderBottom: '1px solid rgba(212,160,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="text-[10px] font-black tracking-widest text-[#d4a017]">SENTINEL REPORT</span>
                <span className="text-[10px] p-1 px-2 rounded bg-[#0a1a0d] border border-[rgba(212,160,23,0.3)] text-[#d4a017]">
                    IQ: {analysis.solarpunkScore}%
                </span>
            </div>

            {/* Critical Alert Layer: Toxicity or Moderation triggers */}
            {analysis.securityWarning && (
                <div style={{ padding: '16px 24px', background: 'rgba(255,85,85,0.1)', borderBottom: '1px solid rgba(255,85,85,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <HiOutlineExclamation className="text-[#ff5555] text-xl shrink-0" />
                    <div>
                        <p className="text-[10px] font-black text-[#ff5555] tracking-widest uppercase mb-1">Security Alert</p>
                        <p className="text-xs text-[rgba(240,235,224,0.8)] leading-tight">{analysis.securityWarning}</p>
                    </div>
                </div>
            )}

            <div className="p-6 space-y-6">
                {/* Title Linguistic Audit */}
                <div>
                    <h5 className="text-[10px] font-black text-[rgba(240,235,224,0.3)] mb-3 tracking-widest uppercase">Title Audit</h5>
                    {typeof analysis.titleAudit === 'object' ? (
                        <div className="space-y-2">
                            <p className="text-xs text-[#f0ebe0] leading-relaxed"><span className="text-[#d4a017] font-bold">Clarity:</span> {analysis.titleAudit.clarity}</p>
                            <p className="text-xs text-[#f0ebe0] leading-relaxed"><span className="text-[#d4a017] font-bold">Impact:</span> {analysis.titleAudit.impact}</p>
                            <p className="text-xs text-[#f0ebe0] leading-relaxed italic block mt-1">"{analysis.titleAudit.suggestion}"</p>
                        </div>
                    ) : (
                        <p className="text-sm text-[#f0ebe0] leading-relaxed italic">"{analysis.titleAudit}"</p>
                    )}
                </div>

                {/* The "Critical Fix": Single most important improvement identified by AI */}
                <div>
                    <h5 className="text-[10px] font-black text-[rgba(240,235,224,0.3)] mb-3 tracking-widest uppercase">Critical Fix</h5>
                    <div style={{ display: 'flex', gap: 12, padding: 12, background: 'rgba(255,85,85,0.05)', border: '1px solid rgba(255,85,85,0.1)', borderRadius: 12 }}>
                        <HiOutlineExclamation className="text-[#ff5555] shrink-0" />
                        <p className="text-xs text-[rgba(240,235,224,0.7)]">
                            {typeof analysis.criticalFix === 'object' ? JSON.stringify(analysis.criticalFix) : analysis.criticalFix}
                        </p>
                    </div>
                </div>

                {/* Structure Analysis: Logic flow and technical depth check */}
                <div>
                    <h5 className="text-[10px] font-black text-[rgba(240,235,224,0.3)] mb-3 tracking-widest uppercase">Structure Audit</h5>
                    <p className="text-xs text-[rgba(240,235,224,0.6)] leading-relaxed">
                        {typeof analysis.structureAudit === 'object' ? JSON.stringify(analysis.structureAudit) : analysis.structureAudit}
                    </p>
                </div>

                {/* SEO Optimization: Auto-generated technical tags */}
                <div>
                    <h5 className="text-[10px] font-black text-[rgba(240,235,224,0.3)] mb-3 tracking-widest uppercase">SEO Optimization</h5>
                    <div className="flex flex-wrap gap-2">
                        {analysis.seoSuggestions?.map(tag => (
                            <span key={tag} className="text-[9px] font-bold p-1 px-2 border border-[rgba(110,196,122,0.2)] text-[#6ec47a] rounded uppercase">#{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Re-Analyze Trigger */}
                <button
                    onClick={onAnalyze}
                    className="w-full py-3 text-[10px] font-black tracking-widest bg-transparent border border-[rgba(240,235,224,0.1)] text-[rgba(240,235,224,0.4)] hover:border-[#d4a017] hover:text-[#d4a017] transition-all rounded-xl"
                >
                    RE-INITIALIZE DIAGNOSTIC
                </button>
            </div>
        </div>
    );
}
