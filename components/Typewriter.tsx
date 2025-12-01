'use client';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypewriterProps {
  text: string;
  speed?: number; // milliseconds per character
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  // Replace newlines with markdown line breaks
  const formattedText = displayedText.replace(/\n/g, '  \n');

  return (
    <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
      <ReactMarkdown>{formattedText}</ReactMarkdown>
    </div>
  );
};
