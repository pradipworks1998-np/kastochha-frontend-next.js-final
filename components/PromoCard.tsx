'use client';
import React from 'react';
import { ExternalLink, Tag, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '../services/api';

interface PromoCardProps {
  type: 'offer' | 'update';
  title: string;
  url: string;
  queryLogId?: string | null;
  componentId?: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({ type, title, url, queryLogId, componentId }) => {
  const isOffer = type === 'offer';
  const signatureGradient = "linear-gradient(90deg, #FF4B4B, #4F93FF)";
  
  const handleTrackClick = () => {
    if (!queryLogId || !componentId) return;
    supabase
      .from("query_impression_log")
      .insert({
        query_log_id: queryLogId,
        component_type: isOffer ? "offer" : "special_update",
        component_id: componentId,
        action_type: "click",
      })
      .then(({ error }: { error: any }) => {
        if (error) console.error("Promo log error:", error.message);
      });
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={handleTrackClick}
      /* MOBILE: Reduced padding from p-6 to p-5, slightly smaller rounding */
      className="group block relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 p-5 md:p-6 transition-all duration-500 shadow-sm hover:shadow-xl active:scale-[0.98] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 opacity-80" style={{ background: signatureGradient }} />
      
      <div className="flex items-start justify-between mb-4 md:mb-5">
        {/* Smaller icon container on mobile */}
        <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-100/50 transition-transform duration-500 group-hover:scale-110" style={{ background: signatureGradient }}>
          {isOffer ? <Tag size={18} className="md:w-5 md:h-5" /> : <Sparkles size={18} className="md:w-5 md:h-5" />}
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-slate-400">
              {isOffer ? 'Exclusive' : 'Just For You'}
            </span>
            <ExternalLink size={12} className="text-slate-300 opacity-0 md:group-hover:opacity-100" />
        </div>
      </div>

      {/* Tighter heading on mobile */}
      <h3 className="font-extrabold text-slate-900 text-lg md:text-xl tracking-tight mb-1 md:mb-2">
        {isOffer ? 'Special Offer' : 'Recommendation'}
      </h3>

      {/* Improved mobile typography: text-xs/sm and leading-snug */}
      <p className="text-slate-600 text-[13px] md:text-sm font-medium leading-relaxed mb-4 md:mb-6 line-clamp-2">
        {title}
      </p>

      <div className="flex items-center text-[10px] md:text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
        <span style={{ backgroundImage: signatureGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {isOffer ? 'Claim Now' : 'Check it out'}
        </span>
        <ArrowRight size={14} className="ml-2 text-[#4F93FF] group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Decorative Glow: Subtle touch */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 blur-[50px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: signatureGradient }} />
    </a>
  );
};