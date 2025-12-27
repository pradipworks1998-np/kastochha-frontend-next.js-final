'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { performSearch } from '../services/api';
import { SearchResponse, FetchStatus, LanguageMode, Offer, Special_Updates } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { ResultsWrapper } from '../components/ResultsWrapper';
import { Footer } from '../components/Footer';
import DiscordButton from '../components/DiscordButton';
// ✅ Import the Loading component (Dancing Habre)
import Loading from './loading'; 

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
    "Mahalxmisthaan ko Naan Pasal 🫓",
    "Mero Ex 👧/👦",
    "Rajesh Dai ko Haat 👊"
  ];

  const handlePromptClick = (prompt: string) => {
    setInputQuery(prompt);
    setStatus(FetchStatus.LOADING);

    const input = document.querySelector<HTMLInputElement>('input[type="text"]');
    input?.focus();

    setTimeout(() => {
      handleSearch(prompt, lastLang);
    }, 0);
  };

  const handleSearch = async (query: string, lang: LanguageMode, location?: string) => {
    if (!query.trim()) {
      setError('Please enter a query.');
      setStatus(FetchStatus.ERROR);
      return;
    }

    setStatus(FetchStatus.LOADING);
    setError(null);
    setLastLang(lang);

    try {
      const result = await performSearch({ query, languageMode: lang, location });

      if ((result as any).offers?.length) {
        result.offer = (result as any).offers[0] as Offer;
      }

      if ((result as any).special_updates?.length) {
        result.special_update = (result as any).special_updates[0] as Special_Updates;
      }

      if (Array.isArray((result as any).sources)) {
        result.sources = (result as any).sources.map((s: any) => ({
          maps: s.maps,
          web: s.web,
          retrievedContext: s.retrievedContext,
        }));
      }

      setData(result as SearchResponse);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Something went wrong. Please try again.');
      setStatus(FetchStatus.ERROR);
      setData(null);
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
    if (data?.answer) {
      setDisplayedAnswer(data.answer);
    }
  }, [data?.answer]);

  const isIdle = status === FetchStatus.IDLE;

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-900 font-sans">
      <main className="flex-grow flex flex-col px-4 pb-50 relative w-full max-w-5xl mx-auto">

        <div
          className={`w-full transition-all duration-700 ease-in-out flex flex-col items-center ${
            isIdle ? 'min-h-[60vh] justify-center' : 'mt-8'
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
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {placeholderPrompts.map((text) => (
                <button
                  key={text}
                  onClick={() => handlePromptClick(text)}
                  className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  {text}
                </button>
              ))}
            </div>
          )}
        </div>

        {!isIdle && (
          <div className="w-full max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
            {/* ✅ Show Error if it exists */}
            {status === FetchStatus.ERROR && <ErrorMessage message={error ?? ''} />}
            
            {/* ✅ Show Dancing Habre only when Loading */}
            {status === FetchStatus.LOADING && (
              <div className="py-10">
                <Loading />
              </div>
            )}

            {/* ✅ Show Results when Success */}
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