'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { PromoCard } from '../components/PromoCard';
import { SourceList } from '../components/SourceList';
import { Typewriter } from '../components/Typewriter';
import { performSearch } from '../services/api';
import { SearchResponse, FetchStatus, LanguageMode } from '../types';
import { AlertCircle, MapPin, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export default function Home() {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Lifted state for SearchBar to allow clearing via Header
  const [inputQuery, setInputQuery] = useState('');
  const [lastLang, setLastLang] = useState<LanguageMode>(LanguageMode.DEFAULT);

  const handleSearch = async (query: string, lang: LanguageMode, location?: string) => {
    setStatus(FetchStatus.LOADING);
    setError(null);
    setLastLang(lang);
    setInputQuery(query); // Keep input synced

    try {
      const result = await performSearch({ query, languageMode: lang, location });
      setData(result);
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
    setInputQuery(''); // Clear the search bar text
  };

  const isIdle = status === FetchStatus.IDLE;

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-y-auto scroll-smooth">
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col px-4 relative w-full max-w-5xl mx-auto">
        
        {/* 
          Centering Container 
          - Centers vertically in IDLE
          - Moves to top in LOADING/SUCCESS
        */}
        <div className={`
          w-full transition-all duration-700 ease-in-out flex flex-col items-center
          ${isIdle ? 'min-h-[60vh] justify-center' : 'mt-8'}
        `}>
          
          {/* Header / Logo */}
          <Header compact={!isIdle} resetSearch={handleReset} />

          {/* Search Bar */}
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

        {/* Results Section */}
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
                
                {/* Advertisement Section */}
                {data.ad && (
                  <a 
                    href={data.ad.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative block w-full h-48 sm:h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Sponsored Tag */}
                    <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm flex items-center gap-1">
                       Sponsored <ExternalLink size={8} />
                    </div>
                    
                    {/* Image */}
                    <img 
                      src={data.ad.imageUrl} 
                      alt="Sponsored" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Ad Label */}
                    <div className="absolute bottom-3 left-4 text-white text-xs font-medium opacity-90">
                      Answer Partner
                    </div>
                  </a>
                )}

                {/* Answer Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {/* Card Header - Only render if location exists */}
                  {data.location && (
                    <div className="px-6 py-3 border-b border-slate-100 flex justify-end items-center bg-slate-50/50">
                      <div className="flex items-center gap-1 text-slate-500 text-sm bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                        <MapPin size={14} />
                        <span className="truncate max-w-[150px]">{data.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
                      <Typewriter text={data.answer} />
                    </div>
                  </div>
                </div>

                {/* Promos Grid */}
                {(data.offer || data.special_update) && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {data.offer && (
                      <PromoCard type="offer" title={data.offer.title} url={data.offer.url} />
                    )}
                    {data.special_update && (
                      <PromoCard type="update" title={data.special_update.title} url={data.special_update.url} />
                    )}
                  </div>
                )}

                {/* Sources */}
                <SourceList sources={data.sources} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Column */}
            <div className="col-span-1">
              <div className="flex items-center gap-1 mb-4">
                <span className="font-extrabold text-xl text-kasto-red">Kasto</span>
                <span className="font-extrabold text-xl text-kasto-blue">Chha</span>
                <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-b from-kasto-blue to-kasto-red">?</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Your AI-powered companion for discovering local businesses, reviews, and hidden gems in Nepal.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-kasto-blue transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors"><Github size={18} /></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-kasto-red transition-colors">Search</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">For Business</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">API</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-kasto-red transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-kasto-red transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-kasto-red transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>&copy; 2025 KastoChha Inc. AI can make mistakes. Please verify important information.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}