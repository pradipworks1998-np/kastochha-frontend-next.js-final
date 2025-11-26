import React from 'react';
import { ExternalLink, Tag, Sparkles, ArrowRight } from 'lucide-react';

interface PromoCardProps {
  type: 'offer' | 'update';
  title: string;
  url: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({ type, title, url }) => {
  const isOffer = type === 'offer';
  
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-md ${
        isOffer 
          ? 'bg-orange-50 border-orange-100 hover:border-orange-300' 
          : 'bg-indigo-50 border-indigo-100 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg ${isOffer ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
          {isOffer ? <Tag size={18} /> : <Sparkles size={18} />}
        </div>
        <ExternalLink size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className={`font-semibold mb-2 ${isOffer ? 'text-orange-900' : 'text-indigo-900'}`}>
        {isOffer ? 'Special Offer' : 'Recommendation'}
      </h3>
      
      <p className="text-slate-700 text-sm font-medium leading-relaxed mb-3">
        {title}
      </p>
      
      <div className={`flex items-center text-xs font-bold uppercase tracking-wide ${isOffer ? 'text-orange-600' : 'text-indigo-600'}`}>
        <span>{isOffer ? 'Claim Now' : 'Check it out'}</span>
        <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
};