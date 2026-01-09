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
      href={url} target="_blank" rel="noopener noreferrer" onClick={handleTrackClick}
      className="group block relative bg-white rounded-[2rem] border border-slate-100 p-6 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 opacity-80" style={{ background: signatureGradient }} />
      <div className="flex items-start justify-between mb-5">
        <div className="p-3 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: signatureGradient }}>
          {isOffer ? <Tag size={20} /> : <Sparkles size={20} />}
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-slate-400">{isOffer ? 'Exclusive' : 'Just For You'}</span>
            <ExternalLink size={14} className="text-slate-300 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
      <h3 className="font-extrabold text-slate-900 text-xl tracking-tight mb-2">{isOffer ? 'Special Offer' : 'Recommendation'}</h3>
      <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">{title}</p>
      <div className="flex items-center text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
        <span style={{ backgroundImage: signatureGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isOffer ? 'Claim Now' : 'Check it out'}</span>
        <ArrowRight size={16} className="ml-2 text-[#4F93FF] group-hover:translate-x-1 transition-transform" />
      </div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: signatureGradient }} />
    </a>
  );
};