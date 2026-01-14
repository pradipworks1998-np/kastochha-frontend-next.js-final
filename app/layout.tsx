import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 1. FONT OPTIMIZATION
// Using 'variable' allows us to use 'font-sans' in Tailwind without layout shift.
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', 
});

// 2. SEO & PERFORMANCE METADATA
export const metadata: Metadata = {
  metadataBase: new URL("https://kastochhanepal.com"),
  title: {
    default: "KastoChha - Nepal's Curiosity Engine",
    template: "%s | KastoChha"
  },
  description: "The AI-powered answer engine for local insights, culture, and travel in Nepal.",
  alternates: {
    canonical: "/",
  },
  // Performance Hints: Warm up the connection to third parties early.
  other: {
    "preconnect": "https://www.googletagmanager.com",
    "dns-prefetch": "https://www.google-analytics.com",
  },
  icons: {
    icon: '/32.png',
    shortcut: '/favicon(2).ico',
    apple: '/64.png',
  },
  openGraph: {
    title: "KastoChha - Nepal's Curious Community Network",
    description: "The Answer Engine for Nepali curiosity.",
    url: "https://kastochhanepal.com",
    siteName: "KastoChha",
    images: [{
      url: "/KastoChha_SM_Image.png", // Next.js resolves this via metadataBase
      width: 1200,
      height: 630,
      alt: "KastoChha Mascot Habre",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KastoChha - Nepal's Curiosity Engine",
    description: "The AI-powered answer engine for local insights.",
    images: ["/KastoChha_SM_Image.png"],
  },
};

// 3. STRUCTURED DATA (JSON-LD)
// Kept outside the component to prevent re-calculation on every render.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KastoChha",
  "alternateName": "Nepal's Curiosity Engine",
  "url": "https://kastochhanepal.com",
  "description": "The AI-powered answer engine for local insights, culture, and travel in Nepal.",
  "publisher": {
    "@type": "Organization",
    "name": "KastoChha",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kastochhanepal.com/32.png"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {/* 4. MAIN CONTENT
            Rendering children first ensures the browser focuses on your 
            actual UI before processing scripts.
        */}
        <main className="flex-grow">
          {children}
        </main>

         <SpeedInsights />

        {/* 5. DEFERRED SCHEMA 
            Placing this at the end of the body prevents it from blocking 
            the initial "Paint" of the website.
        */}
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 6. GOOGLE ANALYTICS (TBT OPTIMIZATION)
            'lazyOnload' is the most effective way to eliminate script-based TBT.
            It waits until the browser is completely idle.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YEHEX8EXWM"
          strategy="lazyOnload"
        />
        <Script id="ga-setup" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YEHEX8EXWM', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}