"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  compact?: boolean;
  resetSearch: () => void;
  isLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ compact, resetSearch, isLoading = false }) => {
  return (
    <header
      className={`
        flex items-center gap-2 transition-all duration-700 ease-in-out select-none
        ${compact ? 'mb-4 scale-75 origin-center' : 'mb-6 md:mb-8 scale-100 origin-center justify-center'}
        ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={() => { if (!isLoading) resetSearch(); }}
    >
      <div className="relative flex items-center justify-center leading-none tracking-tighter">
        <div className={`text-slate-400 mr-2 sm:mr-3 flex items-center transition-all duration-700 ${compact ? 'scale-75' : 'scale-100'}`}>
          <Search 
            strokeWidth={3} 
            className={`text-kasto-red opacity-90 transition-all duration-700
              ${compact ? 'w-6 h-6 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10'}
            `} 
          />
        </div>

        <span className={`font-extrabold text-kasto-red transition-all duration-700 
          ${compact ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>Kasto</span>

        <span className={`font-extrabold text-kasto-blue transition-all duration-700 
          ${compact ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>Chha</span>

        <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-kasto-blue to-kasto-red ml-0.5 transition-all duration-700 
          ${compact ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>?</span>
      </div>
    </header>
  );
};