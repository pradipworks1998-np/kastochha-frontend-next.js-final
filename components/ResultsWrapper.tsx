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

  // ✅ Step 1: Filter to ensure we only have sources with actual data
  // ✅ Step 2: Slice to ensure we NEVER show more than 6
  const allSources = data.sources ?? [];
  const limitedSources = allSources
    .filter((s: any) => s.web || s.maps || s.retrievedContext)
    .slice(0, 6);

  // Optional: Debugging to see the "Cut-off" in action
  useEffect(() => {
    if (allSources.length > 6) {
      console.log(`System Robustness Check: Ignored ${allSources.length - 6} extra sources for UI cleanliness.`);
    }
  }, [allSources]);

  return (
    <div className="mt-8 flex flex-col w-full max-w-4xl mx-auto space-y-6 pb-4 px-4">
      {data.banner && (
        <div className="w-full animate-in fade-in duration-700">
          <Banner banner={data.banner} queryLogId={data.query_log_id} />
        </div>
      )}
      
      <div className="relative">
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
        <div className="pt-10 border-t border-slate-100 grid gap-6 sm:grid-cols-2 animate-in fade-in duration-1000">
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