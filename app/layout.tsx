import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "KastoChha - Nepal's Answer Engine",
  description: "AI-powered answer engine for local insights and travel in Nepal..",

 icons: {
  icon: '/32.png', // The default icon
  shortcut: '/favicon(2).ico', // The legacy fallback
  apple: '/64.png', // For iOS/Mac devices
  other: [
    {
      rel: 'icon',
      url: '/64.png',
      sizes: '64x64',
    },
  ],
},
  
  // Social Media & Messaging Preview (WhatsApp, Facebook, etc.)
  openGraph: {
    title: "KastoChha - Nepal's Curious Community Network",
    description: "The Answer Engine for Nepali curiosity.",
    url: "https://kastochhanepal.com",
    siteName: "KastoChha",
    images: [
      {
        url: "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png",
        width: 1200,
        height: 630,
        alt: "KastoChha logo along with its Mascot Habre",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter/X Preview
  twitter: {
    card: "summary_large_image",
    title: "KastoChha - Nepal's Curious Community Network",
    description: "The Answer Engine for Nepali curiosity.",
    images: ["https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}