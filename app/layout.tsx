import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

/* =========================
   1. FONT OPTIMIZATION
========================= */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* =========================
   2. ROOT METADATA
========================= */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.kastochhanepal.com"),
  title: {
    default: "KastoChha - Nepal's Curiosity Engine",
    template: "%s | KastoChha",
  },
  description: "The AI-assisted answer engine for Nepal's Curious Community Network, delivering instant answers on local insights, culture, and travel.",

  // ✅ Search Result Favicon (Google's 48px rule)
  icons: {
    icon: [
      { url: "/32.png", sizes: "32x32" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon(2).ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    title: "KastoChha - Nepal's Curiosity Engine",
    description: "The Answer Engine for Nepali curiosity.",
    url: "https://www.kastochhanepal.com",
    siteName: "KastoChha",
    images: [
      {
        url: "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png",
        width: 1200,
        height: 630,
        alt: "KastoChha Mascot Habre",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KastoChha - Nepal's Curiosity Engine",
    description: "The AI-powered answer engine for local insights.",
    images: ["https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png"],
  },
};

/* =========================
   3. STRUCTURED DATA
========================= */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.kastochhanepal.com/#organization",
  name: "KastoChha",
  alternateName: [
    "KastoChha - Nepal's Curious Community Network",
    "Kasto Chha",
    "Kasto chha",
    "kastochha",
    "kasto chha",
    "Kastochha"
  ],
  url: "https://www.kastochhanepal.com",
  logo: "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/KastoChha_SM_Image.png",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61582470216854",
    "https://www.instagram.com/kasto_chha/",
    "https://www.linkedin.com/company/kastochha",
    "https://www.tiktok.com/@kasto_chha",
    "https://www.youtube.com/@Kasto_Chha",
    "https://www.reddit.com/r/KastoChha/",
    "https://kastochha.quora.com/",
    "https://x.com/Kasto_chha",
    "https://www.pinterest.com/kastochhaofficial/",
    "https://www.google.com/search?sca_esv=6183b4817dd2e014&rlz=1CAYKUD_enNP1167&kgmid=/g/11yr3q9fqb&q=Kasto+Chha+-+Nepal%27s+Curious+Community+Network"
  ],
  description: "Nepal's curiosity engine and AI-assisted local answer platform built for Nepal's Curious Community Network.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.kastochhanepal.com/#website",
  url: "https://www.kastochhanepal.com",
  name: "KastoChha",
  alternateName: [
    "KastoChha - Nepal's Curious Community Network",
    "Kasto Chha",
    "Kasto chha",
    "kastochha",
    "kasto chha",
    "Kastochha"
  ],
  publisher: {
    "@id": "https://www.kastochhanepal.com/#organization",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ PERFORMANCE: Manual Preconnects for GTM/GA */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {/* ✅ STRUCTURED DATA: Organization and Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <main className="flex-grow">{children}</main>

        <SpeedInsights />
        <Analytics />

        {/* ✅ ANALYTICS: Lazy Loaded after interaction */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YEHEX8EXWM"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
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