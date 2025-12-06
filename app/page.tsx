'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { performSearch } from '../services/api';
import { SearchResponse, FetchStatus, LanguageMode } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { ResultsWrapper } from '../components/ResultsWrapper';
import { Footer } from '../components/Footer';

export default function Home() {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [lastLang, setLastLang] = useState<LanguageMode>(LanguageMode.DEFAULT);

  const handleSearch = async (query: string, lang: LanguageMode, location?: string) => {
    if (!query.trim()) {
      setError('Please enter a query.');
      setStatus(FetchStatus.ERROR);
      return;
    }

    setStatus(FetchStatus.LOADING);
    setError(null);
    setLastLang(lang);
    setInputQuery(query);

    try {
      const result = await performSearch({ query, languageMode: lang, location });
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
      setDisplayedAnswer('');
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedAnswer(prev => prev + data.answer[index]);
        index++;
        if (index >= data.answer.length) clearInterval(interval);
      }, 15);
      return () => clearInterval(interval);
    }
  }, [data?.answer]);

  const isIdle = status === FetchStatus.IDLE;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <main className="flex-grow flex flex-col px-4 pb-50 relative w-full max-w-5xl mx-auto">
        <div className={`w-full transition-all duration-700 ease-in-out flex flex-col items-center ${isIdle ? 'min-h-[60vh] justify-center' : 'mt-8'}`}>
          {/* Pass loading state to Header */}
          <Header
            compact={!isIdle}
            resetSearch={handleReset}
            isLoading={status === FetchStatus.LOADING} // <-- added
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
        </div>

        {!isIdle && (
          <div className="w-full max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
            {status === FetchStatus.ERROR && <ErrorMessage message={error ?? ''} />}
            {status === FetchStatus.SUCCESS && data && (
              <ResultsWrapper data={data} displayedAnswer={displayedAnswer} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
