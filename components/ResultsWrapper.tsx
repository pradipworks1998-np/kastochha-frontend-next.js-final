'use client';
import React, { useState, useEffect } from 'react';
import { Banner } from './Banner';
import { AnswerCard } from './AnswerCard';
import { PromoCard } from './PromoCard';
import { Typewriter } from './Typewriter';

export const ResultsWrapper = ({ data, displayedAnswer }: any) => {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
  }, [data.id]);

  const allSources = data.sources ?? [];
  const limitedSources = allSources
    .filter((s: any) => s.web || s.maps || s.retrievedContext)
    .slice(0, 6);

  return (
    /* IMPROVEMENT: 
       - Changed px-4 to px-2 on mobile (md:px-4) to maximize text width.
       - Reduced space-y-6 to space-y-4 on mobile (md:space-y-8) for a tighter flow.
    */
    <div className="mt-4 md:mt-8 flex flex-col w-full max-w-4xl mx-auto space-y-4 md:space-y-8 pb-4 px-2 md:px-4">
      
      {data.banner && (
        <div className="w-full animate-in fade-in duration-700">
          {/* We will ensure the Banner component itself is responsive */}
          <Banner banner={data.banner} queryLogId={data.query_log_id} />
        </div>
      )}
      
      <div className="relative w-full">
        {/* The 'AnswerCard' is the core. We'll make it 
           borderless on mobile to feel like part of the app.
        */}
        <AnswerCard 
          rawAnswer={displayedAnswer} 
          sources={limitedSources} 
          isTyping={isTyping}
        >
          <Typewriter 
            key="habre-typewriter" 
            text={displayedAnswer} 
            onComplete={() => setIsTyping(false)} 
          />
        </AnswerCard>
      </div>

      {!isTyping && (data.offer || data.special_update) && (
        /* IMPROVEMENT:
           - Reduced pt-10 to pt-6 on mobile.
           - Grid gap reduced on mobile for a sleeker look.
        */
        <div className="pt-6 md:pt-10 border-t border-slate-100 grid gap-4 md:gap-6 sm:grid-cols-2 animate-in fade-in duration-1000">
          {data.offer && (
            <PromoCard 
              type="offer" 
              title={data.offer.title} 
              url={data.offer.link_url} 
              queryLogId={data.query_log_id} 
              componentId={data.offer.id} 
            />
          )}
          {data.special_update && (
            <PromoCard 
              type="update" 
              title={data.special_update.title} 
              url={data.special_update.link_url} 
              queryLogId={data.query_log_id} 
              componentId={data.special_update.id} 
            />
          )}
        </div>
      )}
    </div>
  );
};