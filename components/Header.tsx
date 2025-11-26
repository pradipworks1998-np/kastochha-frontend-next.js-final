import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  compact?: boolean;
  resetSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ compact, resetSearch }) => {
  return (
    <header 
      className={`flex items-center gap-2 cursor-pointer transition-all duration-700 ease-in-out select-none ${compact ? 'mb-4 scale-75 origin-center' : 'mb-8 scale-100 origin-center justify-center'}`}
      onClick={resetSearch}
    >
      {/* Logo Container */}
      <div className="relative flex items-center justify-center leading-none tracking-tighter">
        
        {/* Search Icon (Emoji/Icon representation) */}
        <div className={`text-slate-400 mr-2 sm:mr-3 flex items-center transition-all duration-700 ${compact ? 'scale-75' : 'scale-100'}`}>
           <Search 
             size={compact ? 32 : 40} 
             strokeWidth={3}
             className="text-kasto-red opacity-90"
           />
        </div>

        {/* Kasto (Red) */}
        <span className={`font-extrabold text-kasto-red transition-all duration-700 ${compact ? 'text-4xl' : 'text-5xl'}`}>
          Kasto
        </span>
        
        {/* Chha (Blue) */}
        <span className={`font-extrabold text-kasto-blue transition-all duration-700 ${compact ? 'text-4xl' : 'text-5xl'}`}>
          Chha
        </span>

        {/* Suitable Font-based Question Mark with Gradient */}
        <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-kasto-blue to-kasto-red ml-0.5 transition-all duration-700 ${compact ? 'text-4xl' : 'text-5xl'}`}>
          ?
        </span>

      </div>
    </header>
  );
};