import React from 'react';
import { Link2, Quote } from 'lucide-react';
import { Source } from '../types';

interface SourceListProps {
  sources: Source[];
}

export const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  const getUrl = (source: Source) => {
    if (source.web) return source.web.uri;
    if (source.maps) return source.maps.uri;
    if (source.retrievedContext) return source.retrievedContext.uri;
    return '#';
  };

  const getTitle = (source: Source) => {
    if (source.web) return source.web.title;
    if (source.maps) return source.maps.title;
    if (source.retrievedContext) return source.retrievedContext.title;
    return 'Unknown';
  };

  const getSnippet = (source: Source) => {
    return source.retrievedContext?.text ?? '';
  };

  return (
    <div className="mt-8 border-t border-slate-100 pt-6">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        <Quote size={14} /> Sources & Citations
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={getUrl(source)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-brand-600 truncate pr-2">{getTitle(source)}</span>
              <Link2 size={12} className="text-slate-400 group-hover:text-brand-500" />
            </div>
            {getSnippet(source) && (
              <p className="text-xs text-slate-500 line-clamp-2">{getSnippet(source)}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};
