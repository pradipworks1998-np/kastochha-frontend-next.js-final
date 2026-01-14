'use client';
import React, { useState, useEffect } from 'react';
import { Copy, Check, MessageCircle, Quote, Globe, Languages, Volume2, Square } from 'lucide-react';

export const AnswerCard = ({ children, rawAnswer, sources = [], isTyping }: any) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const signatureGradient = "linear-gradient(90deg, #FF4B4B, #4F93FF)";
  const habreSignature = "\n\n Sent via Habre Dai from KastoChha";

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /* ADDED CLEANUP LOGIC: Stops voice when navigating away */
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined') return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const cleanText = rawAnswer.replace(/[#*`~_]/g, '').trim();
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.lang.startsWith('hi') || v.lang.startsWith('ne'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = 'hi-IN'; 
    utterance.rate = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslateEnglish = () => {
    if (isTyping) return;
    window.open(`https://translate.google.com/?sl=hi&tl=en&text=${encodeURIComponent(rawAnswer)}`, '_blank');
  };

  const handleTranslateNepali = () => {
    if (isTyping) return;
    window.open(`https://translate.google.com/?sl=auto&tl=ne&text=${encodeURIComponent(rawAnswer)}`, '_blank');
  };

  const handleCopy = () => {
    if (isTyping) return;
    navigator.clipboard.writeText(rawAnswer + habreSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (isTyping) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(rawAnswer + habreSignature)}`, '_blank');
  };

  // Original padding and sizing preserved
  const btnActionStyle = (hoverColor: string) => `
    p-3 md:p-3.5 rounded-2xl transition-all duration-300
    ${isTyping ? 'bg-slate-50 text-slate-200 cursor-not-allowed opacity-40' : `bg-slate-50 text-slate-400 active:scale-90 ${hoverColor}`}
  `;

  return (
    <div className="w-full relative group mb-10">
      <div 
        className={`absolute -inset-[1.5px] rounded-[2.6rem] transition-opacity duration-500 ${isTyping ? 'opacity-30' : 'opacity-70 group-hover:opacity-100'}`} 
        style={{ background: signatureGradient }} 
      />

      <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl p-5 md:p-10">
        
        {/* FIXED HEADER: Ensuring Speaker never disappears */}
        <div className="flex flex-row items-center justify-between mb-8 pb-6 border-b border-slate-50 gap-2">
          
          {/* Left: Translations (Shrinkable on tiny screens) */}
          <div className="flex gap-1.5 md:gap-2 shrink">
            <button 
              disabled={isTyping} 
              onClick={handleTranslateEnglish} 
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[9px] font-black uppercase italic tracking-wider transition-all 
              ${isTyping ? 'opacity-40 border-slate-100 text-slate-300' : 'bg-blue-50 border-blue-100 text-blue-600'}`}
            >
              <Languages size={10} className="hidden xs:block" /> ENG
            </button>
            <button 
              disabled={isTyping} 
              onClick={handleTranslateNepali} 
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[9px] font-black uppercase italic tracking-wider transition-all 
              ${isTyping ? 'opacity-40 border-slate-100 text-slate-300' : 'bg-red-50 border-red-100 text-red-600'}`}
            >
              <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse hidden xs:block" /> NEP
            </button>
          </div>

          {/* Right: Actions (Fixed width to prevent disappearing) */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
             <button disabled={isTyping} onClick={handleWhatsAppShare} className={btnActionStyle('hover:bg-green-500 hover:text-white')}>
               <MessageCircle size={18} className="md:w-5 md:h-5" />
             </button>
             <button disabled={isTyping} onClick={handleCopy} className={btnActionStyle('hover:bg-[#FF4B4B] hover:text-white')}>
               {copied ? <Check size={18} className="text-green-500 md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
             </button>
             {/* THE SPEAKER BUTTON - Forced visibility */}
             <button 
                onClick={handleToggleSpeech} 
                className={`p-3 md:p-3.5 rounded-2xl transition-all duration-300 active:scale-90 flex items-center justify-center ${
                  isSpeaking 
                    ? 'bg-red-500 text-white' 
                    : 'bg-slate-50 text-slate-400 hover:bg-[#4F93FF] hover:text-white'
                }`}
             >
                {isSpeaking ? <Square size={18} className="md:w-5 md:h-5" fill="currentColor" /> : <Volume2 size={18} className="md:w-5 md:h-5" />}
             </button>
          </div>
        </div>

        {/* PREMIUM TYPOGRAPHY */}
        <div className="mb-10 text-slate-800 text-[15px] md:text-[18px] leading-relaxed md:leading-[1.8] px-1">
          {children}
        </div>

        {/* ORIGINAL SOURCES */}
        {sources.length > 0 && (
          <div className={`mt-8 pt-8 border-t border-slate-100 transition-opacity duration-700 ${isTyping ? 'opacity-20' : 'opacity-100'}`}>
             <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center">
               <Quote size={12} className="mr-2 text-[#FF4B4B]" /> Context Sources
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {sources.map((source: any, i: number) => {
                 const data = source.web || source.maps || source.retrievedContext;
                 if (!data) return null;
                 return (
                  <a 
                    key={i} 
                    href={data.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-3.5 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-blue-200 transition-all group"
                  >
                    <Globe size={14} className="text-slate-300 mr-3 group-hover:text-blue-500 transition-colors" />
                    <span className="text-[11px] text-slate-600 font-bold truncate transition-colors group-hover:text-slate-900">
                      {data.title}
                    </span>
                  </a>
                 );
               })}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};