'use client';

import {
    HiOutlineDocumentText, HiOutlineCodeBracket,
    HiOutlinePhoto, HiOutlineLink,
    HiOutlineListBullet, HiOutlineRectangleGroup
} from 'react-icons/hi2';

export default function RichTextEditor({ value, onChange, placeholder = "Write something amazing..." }) {
    const tools = [
        { icon: HiOutlineDocumentText, label: 'Text' },
        { icon: HiOutlineListBullet, label: 'List' },
        { icon: HiOutlineCodeBracket, label: 'Code' },
        { icon: HiOutlinePhoto, label: 'Image' },
        { icon: HiOutlineLink, label: 'Link' },
    ];

    return (
        <div style={{
            width: '100%',
            border: '1px solid rgba(74,158,92,0.15)',
            borderRadius: '20px',
            overflow: 'hidden',
            transition: 'all 0.3s',
            background: 'rgba(10,26,13,0.2)'
        }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '8px 12px',
                background: 'rgba(74,158,92,0.05)',
                borderBottom: '1px solid rgba(74,158,92,0.08)'
            }}>
                {tools.map((tool, idx) => (
                    <button
                        key={idx}
                        type="button"
                        style={{
                            padding: 8,
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(240,235,224,0.4)',
                            cursor: 'pointer',
                            borderRadius: 10,
                            display: 'flex',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = '#d4a017';
                            e.currentTarget.style.background = 'rgba(212,160,23,0.05)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'rgba(240,235,224,0.4)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                        title={tool.label}
                    >
                        <tool.icon style={{ width: 18, height: 18 }} />
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <button type="button" style={{ background: 'none', border: 'none', color: 'rgba(240,235,224,0.2)', cursor: 'pointer' }}>
                    <HiOutlineRectangleGroup style={{ width: 18, height: 18 }} />
                </button>
            </div>

            {/* Editor Area */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    minHeight: 300,
                    padding: 24,
                    background: 'rgba(10,26,13,0.4)',
                    color: '#f0ebe0',
                    fontSize: 15,
                    fontFamily: "'JetBrains Mono', monospace",
                    border: 'none',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.6
                }}
            />

            {/* Footer */}
            <div style={{
                padding: '10px 20px',
                background: 'rgba(74,158,92,0.03)',
                borderTop: '1px solid rgba(74,158,92,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: 'rgba(110,196,122,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                    Markdown Supported
                </p>
                <p style={{ fontSize: 10, fontWeight: 800, color: 'rgba(240,235,224,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    {value?.length || 0} characters
                </p>
            </div>
        </div>
    );
}
