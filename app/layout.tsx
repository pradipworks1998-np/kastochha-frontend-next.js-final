import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "KastoChha - Nepal's Curiosity Engine",
  description: "The AI-powered answer engine for local insights, culture, and travel in Nepal. Built for the curious community.",
  
  icons: {
    icon: '/32.png',
    shortcut: '/favicon(2).ico',
    apple: '/64.png',
    other: [
      {
        rel: 'icon',
        url: '/64.png',
        sizes: '64x64',
      },
    ],
  },
  
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KastoChha",
    "alternateName": "Nepal's Curiosity Engine",
    "url": "https://kastochhanepal.com",
    "description": "The AI-powered answer engine for local insights, culture, and travel in Nepal. Built for the curious community.",
    "publisher": {
      "@type": "Organization",
      "name": "KastoChha",
      "logo": {
        "@type": "ImageObject",
        "url": "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png"
      },
      "knowsAbout": ["Nepal Travel", "Nepali Culture", "Local Recommendations", "AI Search"]
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Analytics stays here, but verification moved to DNS for a cleaner head tag */}
        <GoogleAnalytics gaId="G-YEHEX8EXWM" /> 
      </body>
    </html>
  );
}