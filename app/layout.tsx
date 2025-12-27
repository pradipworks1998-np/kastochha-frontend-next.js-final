import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "KastoChha",
  description: "AI-powered answer engine for local insights and travel in Nepal.",
  
  // Social Media & Messaging Preview (WhatsApp, Facebook, etc.)
  openGraph: {
    title: "Habre Guide | KastoChha",
    description: "Your local AI companion for exploring the valley.",
    url: "https://kastochhanepal.com", // Update this with your real domain later
    siteName: "KastoChha",
    images: [
      {
        url: "https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Gemini_Generated_Image_cyqqjucyqqjucyqq.png",
        width: 1200,
        height: 630,
        alt: "Habre the Red Panda - KastoChha Mascot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter/X Preview
  twitter: {
    card: "summary_large_image",
    title: "Habre Guide | KastoChha",
    description: "AI-powered answers for Nepal.",
    images: ["https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Gemini_Generated_Image_cyqqjucyqqjucyqq.png"],
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