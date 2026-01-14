'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { performSearch } from '../services/api';
import { SearchResponse, FetchStatus, LanguageMode, Offer, Special_Updates } from '../types';
import { Footer } from '../components/Footer';
import DiscordButton from '../components/DiscordButton';

const HabreLoader = dynamic(() => import('../components/HabreLoader').then(mod => mod.HabreLoader), { ssr: false });
const ResultsWrapper = dynamic(() => import('../components/ResultsWrapper').then(mod => mod.ResultsWrapper), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse bg-slate-50 rounded-3xl mt-10" />
});
const ErrorMessage = dynamic(() => import('../components/ErrorMessage'), { ssr: false });

export default function Home() {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [lastLang, setLastLang] = useState<LanguageMode>(LanguageMode.DEFAULT);

  const placeholderPrompts = [
    "Balen Ko Chasma 😎",
    "Aaja Ko Rashifal ko list ♈︎",
    "Kabaddi Film 🎬",
    "Butwal Ko Fulki 🫓",
    "Mero Ex 👧/👦",
    "Rajesh Dai ko Haat 👊"
  ];

  // FIX: Immediate state updates to prevent gradient flicker
  const handlePromptClick = (prompt: string) => {
    setInputQuery(prompt);
    setStatus(FetchStatus.LOADING); // Trigger gradient state immediately
    
    // Use the prompt directly in handleSearch instead of waiting for state sync
    handleSearch(prompt, lastLang);
  };

  const handleSearch = async (query: string, lang: LanguageMode) => {
    if (!query.trim()) {
      setError('Please enter a query.');
      setStatus(FetchStatus.ERROR);
      return;
    }

    setStatus(FetchStatus.LOADING);
    setError(null);
    setLastLang(lang);

    try {
      const result = await performSearch({ query, languageMode: lang });
      
      // Data normalization logic
      if ((result as any).offers?.length) result.offer = (result as any).offers[0];
      if ((result as any).special_updates?.length) result.special_update = (result as any).special_updates[0];
      
      setData(result as SearchResponse);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setStatus(FetchStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(FetchStatus.IDLE);
    setData(null);
    setError(null);
    setInputQuery('');
    setDisplayedAnswer('');
  };

  useEffect(() => {
    if (data?.answer) setDisplayedAnswer(data.answer);
  }, [data?.answer]);

  const isIdle = status === FetchStatus.IDLE;

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-900 font-sans">
      {/* Reduced pb-50 to pb-20 for less empty space on mobile */}
      <main className="flex-grow flex flex-col px-4 pb-20 relative w-full max-w-5xl mx-auto">
        
        <div className={`w-full transition-all duration-700 ease-in-out flex flex-col items-center ${
            isIdle 
              ? 'min-h-[75vh] justify-center md:min-h-0 md:justify-start md:mt-32' 
              : 'mt-4 md:mt-10' // Reduced mobile margin from mt-8 to mt-4
          }`}
        >
          <Header
            compact={!isIdle}
            resetSearch={handleReset}
            isLoading={status === FetchStatus.LOADING}
          />

          <SearchBar
            onSearch={handleSearch}
            onClear={handleReset}
            isLoading={status === FetchStatus.LOADING}
            query={inputQuery}
            onQueryChange={setInputQuery}
            initialLang={lastLang}
            compact={!isIdle}
          />

          {isIdle && (
            <div className="mt-8 md:mt-12 w-full overflow-x-auto no-scrollbar touch-pan-x">
              <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2 md:gap-3 px-2 md:px-0">
                {placeholderPrompts.map((text) => (
                  <button
                    key={text}
                    onClick={() => handlePromptClick(text)}
                    className="whitespace-nowrap bg-white border border-gray-300 text-gray-800 px-4 py-1.5 md:py-2 text-[13px] md:text-base rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isIdle && (
          <div className="w-full max-w-4xl mx-auto pb-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
            {status === FetchStatus.ERROR && <ErrorMessage message={error ?? ''} />}
            {status === FetchStatus.LOADING && (
              <div className="py-6 md:py-10">
                <HabreLoader />
              </div>
            )}
            {status === FetchStatus.SUCCESS && data && (
              <ResultsWrapper data={data} displayedAnswer={displayedAnswer} />
            )}
          </div>
        )}
      </main>
      <Footer />
      <DiscordButton />
    </div>
  );
}