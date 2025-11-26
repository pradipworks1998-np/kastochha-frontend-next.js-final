import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Use a ref to keep track of the current index without triggering re-renders
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset state when text changes (e.g. new search)
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        // Append the next character
        const nextChar = text.charAt(indexRef.current);
        setDisplayedText((prev) => prev + nextChar);
        indexRef.current++;
      } else {
        // Finished typing
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-2 h-4 ml-1 align-middle bg-kasto-blue rounded-sm animate-pulse" />
      )}
    </span>
  );
};