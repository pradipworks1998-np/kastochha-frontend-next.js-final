'use client';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { PromoCard } from '../components/PromoCard';
import { SourceList } from '../components/SourceList';
import { Typewriter } from '../components/Typewriter';
import { performSearch } from '../services/api';
import { SearchResponse, FetchStatus, LanguageMode } from '../types';
import { AlertCircle, MapPin, ExternalLink } from 'lucide-react';

export default function Home() {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<SearchResponse | null>(null);
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
      setData(result);
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
  };

  const isIdle = status === FetchStatus.IDLE;

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-y-auto scroll-smooth">
      <main className="flex-grow flex flex-col px-4 relative w-full max-w-5xl mx-auto">
        <div className={`w-full transition-all duration-700 ease-in-out flex flex-col items-center ${isIdle ? 'min-h-[60vh] justify-center' : 'mt-8'}`}>
          <Header compact={!isIdle} resetSearch={handleReset} />
          <div className="w-full z-20">
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
        </div>

        {!isIdle && (
          <div className="w-full max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
            {status === FetchStatus.ERROR && (
              <div className="mt-12 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-600 gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {status === FetchStatus.SUCCESS && data && (
              <div className="mt-8 space-y-6">

                {/* Banner / Ad */}
                {data.banner && data.banner.is_active && (
                  <a
                    href={data.banner.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full h-48 sm:h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <img src={data.banner.image_url} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </a>
                )}

                {/* Answer */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {data.location && (
                    <div className="px-6 py-3 border-b border-slate-100 flex justify-end items-center bg-slate-50/50">
                      <div className="flex items-center gap-1 text-slate-500 text-sm bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                        <MapPin size={14} />
                        <span className="truncate max-w-[150px]">{data.location}</span>
                      </div>
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
                      <Typewriter text={data.answer} />
                    </div>
                  </div>
                </div>

                {/* Offers / Special Updates */}
                {(data.offer || data.special_update) && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {data.offer && <PromoCard type="offer" title={data.offer.title} url={data.offer.url} />}
                    {data.special_update && <PromoCard type="update" title={data.special_update.title} url={data.special_update.url} />}
                  </div>
                )}

                {/* Sources */}
                <SourceList sources={data.sources ?? []} />

              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
