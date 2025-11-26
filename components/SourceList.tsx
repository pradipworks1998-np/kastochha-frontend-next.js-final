import React from 'react';
import { Source } from '../types';
import { Link2, Quote } from 'lucide-react';

interface SourceListProps {
  sources: Source[];
}

export const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-100 pt-6">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        <Quote size={14} /> Sources & Citations
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((source, idx) => (
          <a 
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-brand-600 truncate pr-2">{source.title}</span>
              <Link2 size={12} className="text-slate-400 group-hover:text-brand-500" />
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              {source.snippet}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};