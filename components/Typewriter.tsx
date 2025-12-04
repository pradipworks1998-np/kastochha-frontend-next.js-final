'use client';
import React, { useEffect, useState, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // milliseconds per paragraph pause
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 200, className }) => {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== '');

  const [completedParagraphs, setCompletedParagraphs] = useState<string[]>([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  // 👇 ADD THIS
  const scrollRef = useRef<HTMLDivElement>(null);

  // 👇 Auto-scroll whenever text updates
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [completedParagraphs, currentTypingText]);

  useEffect(() => {
    setCompletedParagraphs([]);
    setCurrentTypingText('');
    setCurrentParagraphIndex(0);

    if (paragraphs.length === 0) return;

    let charIndex = 0;
    let timeoutId: number | undefined;

    const typeCharacter = () => {
      const paragraph = paragraphs[currentParagraphIndex];
      if (charIndex < paragraph.length) {
        setCurrentTypingText(prev => prev + paragraph.charAt(charIndex));
        charIndex++;
        timeoutId = window.setTimeout(typeCharacter, 50);
      } else {
        setCompletedParagraphs(prev => [...prev, paragraph]);
        setCurrentTypingText('');
        charIndex = 0;
        if (currentParagraphIndex + 1 < paragraphs.length) {
          setCurrentParagraphIndex(prev => prev + 1);
          timeoutId = window.setTimeout(typeCharacter, speed);
        }
      }
    };

    typeCharacter();

    return () => clearTimeout(timeoutId);
  }, [text, speed, paragraphs]);

  return (
    <div
      className={`
        typewriter-output
        prose prose-slate
        max-w-none text-lg leading-relaxed text-slate-800
        [&>p]:mb-8 [&>p]:mt-0
        ${className ?? ''}
      `}
    >
      {paragraphs.map((p, idx) => (
        <p key={idx}>
          {completedParagraphs[idx] ?? (idx === currentParagraphIndex ? currentTypingText : '')}
        </p>
      ))}

      {/* 👇 Auto-scroll anchor */}
      <div ref={scrollRef} />
    </div>
  );
};
