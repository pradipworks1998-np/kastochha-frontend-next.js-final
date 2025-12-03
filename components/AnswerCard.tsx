import React from 'react';
import { MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface AnswerCardProps {
  answer: string;
  location?: string;
}

export const AnswerCard = ({ answer, location }: AnswerCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {location && (
        <div className="px-6 py-3 border-b border-slate-100 flex justify-end items-center bg-slate-50/50">
          <div className="flex items-center gap-1 text-slate-500 text-sm bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
            <MapPin size={14} />
            <span className="truncate max-w-[150px]">{location}</span>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {answer}
        </ReactMarkdown>
      </div>
    </div>
  );
};