'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Loading() {
  const pathname = usePathname();

  // We only want the Panda on the main landing page (/) 
  // where your AI interaction/home content lives.
  const isHomePage = pathname === '/';

  // If the user is on /blog, /about, /contact, or /privacy-policy, 
  // show a clean background instead of the dancing Habre.
  if (!isHomePage) {
    return (
      <div className="min-h-screen bg-white" />
    );
  }

  // --- HABRE DAI PANDA CODE (ONLY FOR HOME PAGE) ---
  const videoUrl = "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Firefly%20Make%20the%20panda%20dance%20and%20wave%20the%20Flag.%20631740.mp4";
  const posterUrl = "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Gemini_Generated_Image_cyqqjucyqqjucyqq.png";
  const signatureGradient = "linear-gradient(90deg, #FF4B4B, #4F93FF)";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full py-20 px-4">
      <div className="relative group">
        <div 
          className="absolute -inset-6 rounded-[3.5rem] blur-2xl opacity-30 animate-pulse"
          style={{ background: signatureGradient }}
        />
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-[3rem] overflow-hidden shadow-2xl bg-white border-[6px] border-white">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster={posterUrl}
            className="w-full h-full object-cover scale-110"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="mt-12 text-center max-w-xs">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
          Habre Dai is dancing... <span className="animate-bounce">🕺</span>
        </h2>
        <p className="text-slate-400 font-bold mt-3 text-[11px] uppercase tracking-[0.2em]">
          Please wait, fetching local context
        </p>
      </div>

      <div className="mt-8 w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full w-full origin-left animate-loading-bar" 
          style={{ background: signatureGradient }} 
        />
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-loading-bar {
          animation: loading-bar 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}