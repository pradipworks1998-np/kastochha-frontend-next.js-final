import { createClient } from "contentful";
import BlogListing from "../../components/BlogListing";
import Pagination from "../../components/Pagination";
import HeaderWrapper from "../../components/HeaderWrapper";
import { Footer } from "../../components/Footer";
import DiscordButton from "../../components/DiscordButton";
import { Metadata } from "next";

// --- Invisible Cache Config ---
export const revalidate = 3600;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const POSTS_PER_PAGE = 6;
const SITE_URL = "https://kastochhanepal.com";

// --- Step 1: SEO Metadata (Lives in the browser tab/head only) ---
export const metadata: Metadata = {
  title: 'KastoChha Blog | Nepal Stories, Reviews & Real Experiences',
  description: 'Discover authentic Nepal stories, reviews, and insights shared by the community on KastoChha.',
  alternates: { 
    canonical: `${SITE_URL}/blog`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function BlogIndex() {
  const page = 1;
  
  // Fetching logic exactly as you had it
  const res = await client.getEntries({ 
    content_type: 'blogPost', 
    limit: POSTS_PER_PAGE, 
    skip: 0, 
    order: ['-fields.publishedAt'] as any 
  });
  
  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);

  // --- Step 2: Your EXACT Original Layout ---
  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      {/* We removed the manual <link> tag from here as it's now in Metadata */}
      <HeaderWrapper />
      
      {/* Your original padding and layout classes remain untouched */}
      <main className="px-4 sm:px-6 md:px-12 lg:px-16 flex-1">
        <BlogListing posts={res.items as any} />
        
        <div className="mt-12">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </main>

      <Footer />
      <DiscordButton />
    </div>
  );
}