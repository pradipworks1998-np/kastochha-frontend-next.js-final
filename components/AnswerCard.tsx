'use client';
import React, { useState, useEffect } from 'react';
import { Copy, Check, MessageCircle, Quote, Globe, Languages, Volume2, Square } from 'lucide-react';

export const AnswerCard = ({ children, rawAnswer, sources = [], isTyping }: any) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const signatureGradient = "linear-gradient(90deg, #FF4B4B, #4F93FF)";
  const habreSignature = "\n\n— Sent via Habre Dai (KastoChha)";

  // --- FIX: Pre-load voices so the button works on the first click ---
  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleToggleSpeech = () => {
    // We allow speech even if isTyping is true, but we use the latest rawAnswer
    if (typeof window === 'undefined') return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Use the current version of the answer, cleaned of markdown
    const cleanText = rawAnswer.replace(/[#*`~_]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    // Attempt to find a natural sounding voice (Hindi works best for Nepali)
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
    const baseUrl = "https://translate.google.com/?sl=hi&tl=en&text=";
    window.open(`${baseUrl}${encodeURIComponent(rawAnswer)}`, '_blank');
  };

  const handleTranslateNepali = () => {
    if (isTyping) return;
    const baseUrl = "https://translate.google.com/?sl=auto&tl=ne&text=";
    window.open(`${baseUrl}${encodeURIComponent(rawAnswer)}`, '_blank');
  };

  const handleCopy = () => {
    if (isTyping) return;
    navigator.clipboard.writeText(rawAnswer + habreSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (isTyping) return;
    const textToShare = encodeURIComponent(rawAnswer + habreSignature);
    window.open(`https://wa.me/?text=${textToShare}`, '_blank');
  };

  const btnActionStyle = (hoverColor: string) => `
    p-3.5 rounded-2xl transition-all duration-300
    ${isTyping ? 'bg-slate-50 text-slate-200 cursor-not-allowed opacity-40' : `bg-slate-50 text-slate-400 active:scale-90 ${hoverColor}`}
  `;

  return (
    <div className="w-full relative group mb-8">
      <div className={`absolute -inset-[1.5px] rounded-[2.6rem] transition-opacity duration-500 ${isTyping ? 'opacity-30' : 'opacity-70 group-hover:opacity-100'}`} style={{ background: signatureGradient }} />
      <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl p-7 sm:p-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-start space-x-5">
            <div className="relative p-[2px] rounded-2xl shrink-0 overflow-hidden" style={{ background: signatureGradient }}>
              <div className="w-24 h-24 rounded-[14px] bg-white overflow-hidden relative">
                <img src="https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Gemini_Generated_Image_cyqqjucyqqjucyqq.png" alt="Habre Dai" className="w-full h-full object-cover scale-[1.2]" />
              </div>
            </div>
            <div className="flex flex-col justify-between h-24 py-1">
              <div>
                <h2 className="font-bold text-slate-900 text-2xl tracking-tight">Habre Dai</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">KastoChha's Local Guide</p>
              </div>
              <div className="flex gap-2">
                <button disabled={isTyping} onClick={handleTranslateEnglish} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase italic tracking-wider transition-all ${isTyping ? 'opacity-40 border-slate-100 text-slate-300' : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100'}`}>
                  {!isTyping && <Languages size={10} />} English
                </button>
                <button disabled={isTyping} onClick={handleTranslateNepali} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase italic tracking-wider transition-all ${isTyping ? 'opacity-40 border-slate-100 text-slate-300' : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'}`}>
                  {!isTyping && <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />} Nepali
                </button>
              </div>
            </div>
          </div>

          {/* SINGLE LINE ACTION ROW */}
          <div className="flex items-center gap-2">
             <button disabled={isTyping} onClick={handleWhatsAppShare} className={btnActionStyle('hover:bg-green-500 hover:text-white')}><MessageCircle size={22} /></button>
             <button disabled={isTyping} onClick={handleCopy} className={btnActionStyle('hover:bg-[#FF4B4B] hover:text-white')}>
               {copied ? <Check size={22} className="text-green-500" /> : <Copy size={22} />}
             </button>
             
             {/* RED BACKGROUND FIX */}
             <button 
                onClick={handleToggleSpeech} 
                className={`p-3.5 rounded-2xl transition-all duration-300 active:scale-90 ${
                  isSpeaking 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-100' 
                    : 'bg-slate-50 text-slate-400 hover:bg-[#4F93FF] hover:text-white'
                }`}
             >
                {isSpeaking ? <Square size={22} fill="currentColor" /> : <Volume2 size={22} />}
             </button>
          </div>
        </div>

        <div className="mb-10">{children}</div>

        {sources.length > 0 && (
          <div className={`mt-8 pt-8 border-t border-slate-100 transition-opacity duration-700 ${isTyping ? 'opacity-20' : 'opacity-100'}`}>
             <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center"><Quote size={12} className="mr-2 text-[#FF4B4B]" /> Context Sources</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {sources.map((source: any, i: number) => {
                 const data = source.web || source.maps || source.retrievedContext;
                 if (!data) return null;
                 return (
                  <a key={i} href={data.uri} target="_blank" rel="noopener noreferrer" className="flex items-center p-3.5 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-blue-200 transition-all group">
                    <Globe size={14} className="text-slate-300 mr-3 group-hover:text-blue-500" />
                    <span className="text-[11px] text-slate-600 font-bold truncate">{data.title}</span>
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