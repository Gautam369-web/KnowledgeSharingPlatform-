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
        <div className="w-full border-2 border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden focus-within:border-primary-500/50 transition-all">
            {/* Toolbar */}
            <div className="flex items-center space-x-1 p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                {tools.map((tool, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
                        title={tool.label}
                    >
                        <tool.icon className="w-5 h-5" />
                    </button>
                ))}
                <div className="flex-1" />
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
                    <HiOutlineRectangleGroup className="w-5 h-5" />
                </button>
            </div>

            {/* Editor Area */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[300px] p-4 bg-white dark:bg-slate-900 
                 text-slate-900 dark:text-white placeholder-slate-400 
                 focus:outline-none focus:ring-0 border-0 resize-none font-mono text-sm"
            />

            {/* Footer */}
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center px-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Markdown Supported</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{value?.length || 0} characters</p>
            </div>
        </div>
    );
}
