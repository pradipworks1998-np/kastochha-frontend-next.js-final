import HeaderWrapper from "../../components/HeaderWrapper";
import { Footer } from "../../components/Footer";
import DiscordButton from "../../components/DiscordButton";
import BlogListing from "../../components/BlogListing";
import Pagination from "../../components/Pagination";
import { createClient } from "contentful";
import { Metadata } from "next";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: "Blogs | KastoChha",
  description: "Explore our latest stories, guides, and insights from Nepal.",
  alternates: {
    canonical: "https://kastochhanepal.com/blog",
  },
};

export default async function BlogPage() {
  const res = await client.getEntries({
    content_type: "blogPost",
    limit: POSTS_PER_PAGE,
    skip: 0,
    order: ["-fields.publishedAt"] as any,
  });

  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      {/* SEO: Blog Collection Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "KastoChha Blog",
            "description": "Explore our latest stories, guides, and insights from Nepal.",
            "url": "https://kastochhanepal.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "KastoChha",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kastochhanepal.com/logo.png" // Update with your actual logo URL if different
              }
            }
          }),
        }}
      />

      <HeaderWrapper />

      <h1 className="sr-only">KastoChha Blogs</h1>

      <div className="px-4 sm:px-6 md:px-12 lg:px-16 mt-4">
        <div
          className="relative w-full h-[20vh] md:h-[25vh] bg-cover rounded-xl overflow-hidden mx-auto shadow-lg"
          style={{
            backgroundImage:
              "url('https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/sign/Banners/Banner_final_Gemini_Generated_Image_u7opv4u7opv4u7op.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNDVjMjM5MS0wZWRhLTRlNTgtYTA0Ni1iOWVlMTI2NTU1MDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYW5uZXJzL0Jhbm5lcl9maW5hbF9HZW1pbmlfR2VuZXJhdGVkX0ltYWdlX3U3b3B2NHU3b3B2NHU3b3AucG5nIiwiaWF0IjoxNzY1ODkxMjU4LCJleHAiOjE3Njg0ODMyNTh9.5tM5Z5XVxtCYa1nLI1ZRYClJR4CslcrdAh30TjR9xDU')",
            backgroundPosition: "center 15%",
            backgroundSize: "cover",
          }}
        >
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-16 flex-1">
        <main className="relative max-w-7xl mx-auto -mt-8 bg-white rounded-[2rem] shadow-xl p-6 sm:p-10 md:p-12 mb-12 border border-gray-100 z-20">
          <BlogListing posts={res.items as any[]} />
          
          <div className="mt-12 pt-8 border-t border-slate-100 w-full">
            <Pagination page={1} totalPages={totalPages} />
          </div>
        </main>
      </div>

      <Footer />
      <DiscordButton />
    </div>
  );
}