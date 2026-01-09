import { createClient } from "contentful";
import { redirect, notFound } from "next/navigation";
import BlogListing from "../../../../components/BlogListing";
import Pagination from "../../../../components/Pagination";
import HeaderWrapper from "../../../../components/HeaderWrapper";
import { Footer } from "../../../../components/Footer";
import DiscordButton from "../../../../components/DiscordButton";
import { Metadata } from "next";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const POSTS_PER_PAGE = 6;

// --- Step 1: SEO Metadata (Invisible to layout) ---
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = Number(pageStr);
  
  return {
    title: `KastoChha Blog - Page ${page}`,
    alternates: { 
      canonical: `https://kastochhanepal.com/blog/page/${page}` 
    },
  };
}

export default async function BlogPaged({ params }: { params: Promise<{ page: string }> }) {
  // --- Step 2: Compliance Fix (Await params for Next.js 14.2/15) ---
  const { page: pageStr } = await params;
  const page = Number(pageStr);

  // Logic remains identical to yours
  if (page <= 1 || Number.isNaN(page)) redirect("/blog");

  const res = await client.getEntries({
    content_type: "blogPost",
    limit: POSTS_PER_PAGE,
    skip: (page - 1) * POSTS_PER_PAGE,
    order: ["-fields.publishedAt"] as any,
  });

  if (!res.items.length) notFound();

  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);

  // --- Step 3: Your EXACT Original Layout ---
  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      <HeaderWrapper />
      
      <main className="px-4 sm:px-6 md:px-12 lg:px-16 flex-1">
        <BlogListing posts={res.items} />
        <div className="mt-12">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </main>

      <Footer />
      <DiscordButton />
    </div>
  );
}

export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: "blogPost", limit: 1000 });
  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}