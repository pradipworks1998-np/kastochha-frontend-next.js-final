import React from 'react';
import { Banner as BannerType } from '../types';


interface BannerProps {
banner?: BannerType | null | undefined;
}


export const Banner = ({ banner }: BannerProps) => {
if (!banner || !banner.is_active) return null;


return (
<a
href={banner.link_url}
target="_blank"
rel="noopener noreferrer"
className="group relative block w-full h-48 sm:h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
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