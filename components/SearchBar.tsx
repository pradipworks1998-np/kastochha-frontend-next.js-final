import React, { useState, FormEvent, useRef } from 'react';
import { Search, MapPin, Globe, Loader2, ArrowRight, X } from 'lucide-react';
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

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear,
  isLoading, 
  query,
  onQueryChange,
  initialLang = LanguageMode.DEFAULT,
  compact = false 
}) => {
  const [lang, setLang] = useState<LanguageMode>(initialLang);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Geolocation states
  const [locationCoords, setLocationCoords] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const handleLocationToggle = () => {
    if (locationCoords) {
      setLocationCoords(null);
      setLocationError(false);
      return;
    }

    setIsLocating(true);
    setLocationError(false);

    if (!navigator.geolocation) {
      setLocationError(true);
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordsString = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setLocationCoords(coordsString);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(true);
        setIsLocating(false);
      }
    );
  };

  const handleClear = () => {
    onQueryChange('');
    if (onClear) onClear();
    // Focus input after clearing so user can type immediately
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, lang, locationCoords || undefined);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`w-full mx-auto transition-all duration-500 ${compact ? 'max-w-4xl' : 'max-w-3xl'}`}
    >
      <div className={`
        relative flex items-center gap-2 bg-white border border-slate-200 shadow-sm
        focus-within:shadow-md focus-within:border-kasto-lightBlue
        transition-all duration-300
        ${compact ? 'rounded-2xl p-1.5' : 'rounded-full p-2 pl-6'}
      `}>
        
        {/* Search Icon */}
        <div className={`${compact ? 'pl-3' : ''} text-slate-400`}>
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </div>

        {/* Main Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={locationCoords ? "Search nearby places..." : "Search places (e.g. ABC Bakery)..."}
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-base sm:text-lg min-w-0 ml-2 py-2"
          disabled={isLoading}
        />

        {/* Clear Button (Visible when query exists) */}
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors mr-1"
            title="Clear Search"
          >
            <X size={18} />
          </button>
        )}

        {/* Right Side Controls Group */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-50 rounded-full p-1 border border-slate-100">
          
          {/* Location Toggle (Icon Only) */}
          <button
            type="button"
            onClick={handleLocationToggle}
            title={locationCoords ? "Location Active" : "Use My Location"}
            className={`
              p-2 rounded-full transition-all duration-200 relative group
              ${locationCoords 
                ? 'bg-blue-100 text-kasto-blue' 
                : locationError
                  ? 'bg-red-50 text-red-500'
                  : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
              }
            `}
          >
            {isLocating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <MapPin size={18} className={locationCoords ? 'fill-current' : ''} />
            )}
            
            {/* Status Dot */}
            {locationCoords && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-kasto-blue rounded-full border border-white"></span>
            )}
          </button>

          {/* Vertical Divider */}
          <div className="w-px h-5 bg-slate-200 hidden sm:block"></div>

          {/* Compact Language Selector */}
          <div className="relative hidden sm:block">
            <select 
              value={lang}
              onChange={(e) => setLang(e.target.value as LanguageMode)}
              className="appearance-none bg-transparent py-1.5 pl-2 pr-6 text-sm font-semibold text-slate-600 cursor-pointer hover:text-kasto-blue outline-none text-right w-16"
            >
              <option value={LanguageMode.DEFAULT}>Mix</option>
              <option value={LanguageMode.NEPALI}>NEP</option>
              <option value={LanguageMode.ENGLISH}>ENG</option>
            </select>
            <Globe size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Submit Button (Circle Arrow) */}
          <button 
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full 
              transition-all duration-300 shadow-sm
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

      {/* Helper Message for Location Error */}
      {locationError && (
        <div className="absolute mt-2 ml-6 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          Location access denied. Please enable permissions.
        </div>
      )}
    </form>
  );
};