'use client';
import React from 'react';
import Link from 'next/link'; // ✅ ADD THIS IMPORT
import { FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaFacebookF, FaReddit } from 'react-icons/fa';
import { SiX, SiTiktok, SiQuora } from 'react-icons/si';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61582470216854', icon: <FaFacebookF size={18} />, colorClass: 'hover:text-blue-600' },
    { name: 'Instagram', url: 'https://www.instagram.com/kasto_chha/', icon: <FaInstagram size={18} />, colorClass: 'hover:text-pink-500' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@kasto_chha', icon: <SiTiktok size={18} />, colorClass: 'hover:text-black' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Kasto_Chha', icon: <FaYoutube size={18} />, colorClass: 'hover:text-red-500' },
    { name: 'Reddit', url: 'https://reddit.com/r/KastoChha/', icon: <FaReddit size={20} />, colorClass: 'hover:text-orange-500' },
    { name: 'Quora', url: 'https://kastochha.quora.com/', icon: <SiQuora size={16} />, colorClass: 'hover:text-red-700' },
    { name: 'X', url: 'https://x.com/Kasto_chha', icon: <SiX size={18} />, colorClass: 'hover:text-blue-500' },
    { name: 'Pinterest', url: 'https://www.pinterest.com/kastochhaofficial/', icon: <FaPinterest size={18} />, colorClass: 'hover:text-red-600' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/kastochha', icon: <FaLinkedin size={18} />, colorClass: 'hover:text-blue-700' },
  ];

  return (
    <footer className="w-full flex-shrink-0 bg-slate-50">
      
      {/* Animated Red-Blue Gradient Bar */}
      <div className="w-full h-1 rounded overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full 
            bg-gradient-to-r from-[#FF4B4B] to-[#4F93FF] 
            animate-gradient-x">
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-[14px] sm:text-[15px] text-slate-800">

        {/* Left on desktop / Top on mobile: links */}
        <div className="order-1 sm:order-1 flex flex-wrap justify-center sm:justify-start gap-5 w-full sm:w-auto">
          {/* ✅ UPDATED TO LINK COMPONENTS FOR INSTANT SPEED */}
          <Link href="/about" prefetch={true} className="hover:underline transition">About</Link>
          <Link href="/blog" prefetch={true} className="hover:underline transition">Blogs</Link>
          <Link href="/contact" prefetch={true} className="hover:underline transition">Contact</Link>
          <Link href="/privacy-policy" prefetch={true} className="hover:underline transition">Privacy Policy</Link>
        </div>

        {/* Center on desktop / Middle on mobile: social icons */}
        <div className="order-2 sm:order-2 flex gap-4 justify-center w-full sm:w-auto mt-4 sm:mt-0">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-slate-500 transition transform hover:scale-110 ${link.colorClass ?? ''} hover:brightness-110`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right on desktop / Bottom on mobile: copyright */}
        <div className="order-3 sm:order-3 w-full sm:w-auto text-center sm:text-right mt-4 sm:mt-0">
          © 2025 KastoChha – Nepali Answer Engine
        </div>

      </div>
    </footer>
  );
};