'use client';
import React, { useState, FormEvent, useRef, useEffect, useMemo } from 'react';
import { Search, Loader2, ArrowRight, X, Globe } from 'lucide-react';
import { LanguageMode } from '../types';

interface SearchBarProps {
  onSearch: (query: string, lang: LanguageMode) => void;
  onClear?: () => void;
  isLoading: boolean;
  query: string;
  onQueryChange: (newQuery: string) => void;
  initialLang?: LanguageMode;
  compact?: boolean;
}

const FIRST_EMOJI = "🍕📱🏔️🚲";
const emojiSets = ["🍕📱🏔️🚲🍜", "🏞️⛩️🛶🍣", "🍜📱🏨🗿", "📱🚗🏕️🎉"];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch, 
  onClear, 
  isLoading, 
  query, 
  onQueryChange, 
  initialLang = LanguageMode.DEFAULT, 
  compact = false
}) => {
  const [lang] = useState(initialLang);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);

  // Auto-resize textarea logic (Original Logic)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Added only this line to ensure the view follows the text as it grows
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [query]);

  // Emoji rotation logic
  useEffect(() => {
    const interval = setInterval(() => setEmojiIndex(i => (i + 1) % emojiSets.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const emojiPlaceholder = useMemo(() => emojiSets[emojiIndex], [emojiIndex]);
  
  const handleClear = () => { 
    onQueryChange(''); 
    onClear?.(); 
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (query.trim() && !isLoading) onSearch(query, lang);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isActive = focused || isLoading || compact;
  const placeholderText = focused || query || isLoading ? '' : `Ask About ${emojiPlaceholder || FIRST_EMOJI}....`;

  return (
    <form onSubmit={handleSubmit} className={`w-full mx-auto transition-all duration-500 ${compact ? 'md:max-w-4xl' : 'md:max-w-3xl'}`}>
      <div className={`p-[1px] transition-all duration-300 ${query.length > 50 ? 'rounded-[24px]' : 'rounded-full'}`} 
           style={{ background: 'linear-gradient(90deg, #FF4B4B, #4F93FF)' }}>
        
        <div className={`flex items-center gap-2 shadow-sm w-full transition-all duration-300 px-3 py-1.5 md:py-2
            ${query.length > 50 ? 'rounded-[24px]' : 'rounded-full'}
            ${isActive 
              ? 'bg-gradient-to-r from-[#FF4B4B] to-[#4F93FF] text-white' 
              : 'bg-white text-slate-800'
            }
          `}>
          
          <div className={`ml-1 md:ml-2 flex items-center justify-center ${isActive ? 'text-white' : 'text-slate-400'}`}>
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
          </div>

          <textarea
            ref={textareaRef}
            rows={1}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            /* CHANGED overflow-hidden to overflow-y-auto */
            className={`flex-1 bg-transparent outline-none ml-1 py-2 resize-none overflow-y-auto self-center
              text-[16px] md:text-base leading-tight max-h-[160px] md:max-h-[250px]
              ${isActive ? 'text-white placeholder-white/70' : 'text-slate-800 placeholder-slate-500'}
            `}
            disabled={isLoading}
          />

          <div className="flex items-center gap-1">
            {query && !isLoading && (
              <button type="button" onClick={handleClear} className={`p-1.5 rounded-full ${isActive ? 'text-white hover:bg-white/20' : 'text-slate-400 hover:bg-slate-100'}`}>
                <X className="w-4.5 h-4.5" />
              </button>
            )}
            
            <div className={`flex items-center gap-1 rounded-full p-0.5 md:p-1 border ${isActive ? 'bg-white/20 border-white/30 text-white' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-1 px-1.5 md:px-2">
                <Globe className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className={`hidden sm:inline text-[10px] md:text-sm font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>NEPALISH</span>
              </div>
              <button 
                type="submit" 
                disabled={isLoading || !query.trim()} 
                aria-label={isLoading ? "Sending query" : "Search"}
                className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all 
                  ${!query.trim() || isLoading 
                    ? 'bg-slate-200/50 text-slate-400' 
                    : 'bg-kasto-red text-white shadow-md active:scale-90'}`}
              >
                <ArrowRight className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};