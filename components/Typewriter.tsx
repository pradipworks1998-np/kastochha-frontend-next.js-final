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
  }, [words, text, onComplete]); 

  return (
    <div className="prose prose-slate max-w-none antialiased selection:bg-red-100 selection:text-[#FF4B4B]">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // PREMIUM AI TYPOGRAPHY: Responsive sizes (15px mobile, 18px desktop)
          p: ({children}) => (
            <p className="mb-6 last:mb-0 leading-relaxed md:leading-[1.8] text-slate-800 text-[15px] md:text-[18px] font-medium whitespace-pre-wrap">
              {children}
            </p>
          ),
          // SECTION HEADERS: Slightly smaller for mobile clutter reduction
          h3: ({children}) => (
            <h3 className="block mt-8 md:mt-12 mb-4 md:mb-6 text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight border-l-4 border-[#4F93FF] pl-4 py-1 bg-blue-50/40 rounded-r-lg">
              {children}
            </h3>
          ),
          // BOLD TEXT: Clean blue underline style
          strong: ({children}) => (
            <strong className="font-bold text-slate-900 border-b-2 border-blue-100 px-0.5">
              {children}
            </strong>
          ),
          // LISTS: Balanced spacing for mobile
          ul: ({children}) => (
            <ul className="mb-6 space-y-3 md:space-y-4 list-disc list-inside text-slate-700">
              {children}
            </ul>
          ),
          li: ({children}) => (
            <li className="leading-relaxed text-[15px] md:text-[18px] pl-2">
              {children}
            </li>
          ),
        }}
      >
        {currentText}
      </ReactMarkdown>
      {!isDone && (
        <span className="inline-block w-2 h-5 md:h-6 ml-1 bg-[#4F93FF] animate-pulse align-middle rounded-full" />
      )}
    </div>
  );
};