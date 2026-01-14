'use client';
import React from 'react';
import { Banner as BannerType } from '../types';
import { supabase } from '../services/api';

interface BannerProps {
  banner?: BannerType | null | undefined;
  queryLogId?: string | null;
}

export const Banner = ({ banner, queryLogId }: BannerProps) => {
  if (!banner || !banner.is_active) return null;

  const handleTrackClick = () => {
    if (!queryLogId || !banner.id) return;
    supabase
      .from("query_impression_log")
      .insert({
        query_log_id: queryLogId,
        component_type: "banner",
        component_id: banner.id,
        action_type: "click",
      })
      .then(({ error }: { error: any }) => {
        if (error) console.error("Banner log error:", error.message);
      });
  };

  return (
    <a
      href={banner.link_url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleTrackClick} // This was the crucial fix—linking your function
      /* FIXED HEIGHT FOR MOBILE CLUTTER: 
         Changed h-48 to h-32 on mobile (h-32 sm:h-64).
         This prevents the banner from pushing the AI answer off-screen on phones.
      */
      className="group relative block w-full h-32 sm:h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <img 
        src={banner.image_url} 
        alt="Banner" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </a>
  );
};