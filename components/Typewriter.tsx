'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Typewriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const words = useMemo(() => text.split(' '), [text]);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (currentText === text && text !== '') return;

    wordIndexRef.current = 0;
    setCurrentText('');
    setIsDone(false);
    
    const interval = setInterval(() => {
      if (wordIndexRef.current < words.length) {
        setCurrentText(words.slice(0, wordIndexRef.current + 1).join(' '));
        wordIndexRef.current++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, 35);

    return () => clearInterval(interval);
  }, [words, onComplete]); 

  return (
    <div className="prose prose-slate max-w-none antialiased">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // ✅ FIX 1: Paragraph Spacing & Line Height for Nepali Script
          p: ({children}) => (
            <p className="mb-8 last:mb-0 leading-[1.85] text-slate-700 text-lg font-medium whitespace-pre-wrap">
              {children}
            </p>
          ),
          // ✅ FIX 2: Style Section Headers (Matching the ### in your JSON)
          h3: ({children}) => (
            <h3 className="block mt-12 mb-6 text-2xl font-extrabold text-slate-900 tracking-tight border-l-4 border-[#4F93FF] pl-4 py-1 bg-blue-50/40 rounded-r-lg">
              {children}
            </h3>
          ),
          // ✅ FIX 3: Keep Bold Text (Hotel Names) Inline (Not as Blocks)
          strong: ({children}) => (
            <strong className="font-bold text-slate-900 border-b-2 border-blue-50 px-0.5">
              {children}
            </strong>
          ),
          // ✅ FIX 4: Clean List Layout
          ul: ({children}) => (
            <ul className="mb-8 space-y-4 list-disc list-inside text-slate-600">
              {children}
            </ul>
          ),
          li: ({children}) => (
            <li className="leading-relaxed pl-2 text-slate-700">
              {children}
            </li>
          ),
        }}
      >
        {currentText}
      </ReactMarkdown>
      {!isDone && (
        <span className="inline-block w-1.5 h-5 ml-1 bg-[#4F93FF] animate-pulse align-middle rounded-full" />
      )}
    </div>
  );
};