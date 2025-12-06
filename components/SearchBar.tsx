'use client';
import React, { useState, FormEvent, useRef, useEffect, useMemo } from 'react';
import { Search, MapPin, Loader2, ArrowRight, X, Globe } from 'lucide-react';
import { LanguageMode } from '../types';

interface SearchBarProps {
  onSearch: (query: string, lang: LanguageMode, location?: string) => void;
  onClear?: () => void;
  isLoading: boolean;
  query: string;
  onQueryChange: (newQuery: string) => void;
  initialLang?: LanguageMode;
  compact?: boolean;
}

// Pre-rendered first emoji for SSR
const FIRST_EMOJI = "🥟🍲🏔🛵🍛🏍🚗🏕🛶📱";

// Emoji sets for rotation
const emojiSets = [
  "🥟🍲🏔🛵🍛🏍🚗🏕🛶📱",
  "🏞🚲⛩️🍛🛶🎉🍹🏔🏍🍢",
  "🕌🍜📱🏨🍲🗻🚗🏕🎉🛶",
  "📱🥟🍛🏔🏍🛵🚗🏕🎉🛶"
];

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  // Emoji rotation
  const [emojiIndex, setEmojiIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setEmojiIndex(i => (i + 1) % emojiSets.length), 3000);
    return () => clearInterval(interval);
  }, []);
  const emojiPlaceholder = useMemo(() => emojiSets[emojiIndex], [emojiIndex]);

  // Location
  const [locationCoords, setLocationCoords] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const handleLocationToggle = () => {
    if (locationCoords) return setLocationCoords(null), setLocationError(false);
    setIsLocating(true);
    setLocationError(false);
    if (!navigator.geolocation) return setLocationError(true), setIsLocating(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationCoords(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        setIsLocating(false);
      },
      () => { setLocationError(true); setIsLocating(false); }
    );
  };

  const handleClear = () => { onQueryChange(''); onClear?.(); inputRef.current?.focus(); };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query, lang, locationCoords || undefined);
  };

  // Placeholder logic
  const placeholderText = focused
    ? ''
    : query
      ? ''
      : `Ask About ${emojiPlaceholder || FIRST_EMOJI}....`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full mx-auto transition-all duration-500 ${compact ? 'max-w-4xl' : 'max-w-3xl'}`}
    >
      {/* Gradient border ALWAYS visible (original look) */}
      <div
        className="rounded-full p-[1px]"
        style={{ background: 'linear-gradient(90deg, #FF4B4B, #4F93FF)' }}
      >
        {/* Full gradient when focused */}
        <div
          className={`flex items-center gap-2 rounded-full shadow-sm w-full transition-all duration-300
            ${compact ? 'rounded-2xl p-1.5' : 'rounded-full p-2 pl-6'}
            ${focused
              ? 'bg-gradient-to-r from-[#FF4B4B] to-[#4F93FF] text-white'
              : 'bg-white text-slate-800'
            }
          `}
        >

          {/* Search Icon / Loader */}
          <div className={`${compact ? 'pl-3' : ''} ${focused ? 'text-white' : 'text-slate-400'}`}>
            {isLoading ? (
              <Loader2 className={`animate-spin ${focused ? 'text-white' : ''}`} size={20} />
            ) : (
              <Search size={20} />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholderText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`
              flex-1 min-w-0 bg-transparent outline-none
              ml-2 py-2
              placeholder-slate-600
              text-sm sm:text-base
              ${focused ? 'text-white' : 'text-slate-800 placeholder-slate-600'}
            `}
            disabled={isLoading}
          />

          {/* Clear Button */}
          {query && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className={`p-1.5 rounded-full transition-colors mr-1
                ${focused
                  ? 'text-white hover:bg-white/20'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              <X size={18} />
            </button>
          )}

          {/* Right Controls */}
          <div
            className={`
              flex items-center gap-1 sm:gap-2 rounded-full p-1 border
              ${focused
                ? 'bg-white/20 border-white/30 text-white'
                : 'bg-slate-50 border-slate-100 text-slate-600'
              }
            `}
          >
            <button
              type="button"
              onClick={() => { if (!isLoading) handleLocationToggle(); }} // <-- block click while loading
              className={`p-1 sm:p-2 rounded-full transition-all duration-200 relative ${isLoading ? 'cursor-not-allowed' : ''}`} // <-- cursor blocked while loading
            >
              {isLocating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <MapPin size={18} className="sm:w-6 sm:h-6 w-5 h-5" />
              )}
              {locationCoords && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-kasto-blue rounded-full border border-white"></span>
              )}
            </button>

            <div className={`hidden sm:block w-px h-5 ${focused ? 'bg-white/40' : 'bg-slate-200'}`}></div>

            <div className="flex items-center gap-1 px-2">
              <Globe size={14} className={focused ? 'text-white' : 'text-slate-400'} />
              <span className={`hidden sm:inline text-sm font-semibold ${focused ? 'text-white' : 'text-slate-600'}`}>
                NEPALISH
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-sm
                ${!query.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-kasto-red text-white hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95'
                }
              `}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Location Error */}
      {locationError && (
        <div className="absolute mt-2 ml-6 text-xs font-medium text-red-500">
          Location access denied. Please enable permissions.
        </div>
      )}
    </form>
  );
};
