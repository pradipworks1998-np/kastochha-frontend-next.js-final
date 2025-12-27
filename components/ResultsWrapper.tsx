'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Banner } from './Banner';
import { AnswerCard } from './AnswerCard';
import { PromoCard } from './PromoCard';
import { Typewriter } from './Typewriter';

export const ResultsWrapper = ({ data, displayedAnswer }: any) => {
  const [isTyping, setIsTyping] = useState(true);

  // Reset typing state whenever a new answer/query starts
  useEffect(() => {
    setIsTyping(true);
  }, [data.id]);

  return (
    <div className="mt-8 flex flex-col w-full max-w-4xl mx-auto space-y-10 pb-32 px-4">
      {data.banner && (
        <div className="w-full animate-in fade-in duration-700">
          <Banner banner={data.banner} />
        </div>
      )}
      
      <div className="relative">
        <AnswerCard 
          rawAnswer={displayedAnswer} 
          sources={data.sources ?? []} 
          isTyping={isTyping}
        >
          {/* The key "habre-typewriter" ensures the component 
              stays stable while displayedAnswer updates.
          */}
          <Typewriter 
            key="habre-typewriter" 
            text={displayedAnswer} 
            onComplete={() => setIsTyping(false)} 
          />
        </AnswerCard>
      </div>

      {!isTyping && (data.offer || data.special_update) && (
        <div className="pt-10 border-t border-slate-100 grid gap-6 sm:grid-cols-2 animate-in fade-in duration-1000">
          {data.offer && (
            <PromoCard 
              type="offer" 
              title={data.offer.title} 
              url={data.offer.link_url} 
            />
          )}
          {data.special_update && (
            <PromoCard 
              type="update" 
              title={data.special_update.title} 
              url={data.special_update.link_url} 
            />
          )}
        </div>
      )}

      {/* Spacer remains for visual layout consistency but no longer serves as a scroll target */}
      <div className="h-20 w-full pointer-events-none" />
    </div>
  );
};