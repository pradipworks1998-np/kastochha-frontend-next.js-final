import HeaderWrapper from '../../../../components/HeaderWrapper';
import { Footer } from '../../../../components/Footer';
import DiscordButton from '../../../../components/DiscordButton';
import BlogListing from '../../../../components/BlogListing';
import Pagination from '../../../../components/Pagination';
import { createClient } from 'contentful';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const POSTS_PER_PAGE = 6;

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const page = params.page;
  return {
    title: `Blogs - Page ${page} | KastoChha`,
    description: `Explore our stories and insights on page ${page}.`,
    alternates: {
      canonical: `https://kastochhanepal.com/blog/page/${page}`,
    },
  };
}

export default async function BlogPaged({ params }: { params: { page: string } }) {
  const page = Number(params.page);

  if (page <= 1 || Number.isNaN(page)) {
    notFound();
  }

  const res = await client.getEntries({
    content_type: 'blogPost',
    limit: POSTS_PER_PAGE,
    skip: (page - 1) * POSTS_PER_PAGE,
    order: ['-fields.publishedAt'] as any,
  });

  if (!res.items.length) {
    notFound();
  }

  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      {/* SEO: CollectionPage Schema for Pagination */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `KastoChha Blog - Page ${page}`,
            "description": `Browse our archive of stories and insights on page ${page}.`,
            "url": `https://kastochhanepal.com/blog/page/${page}`,
            "isPartOf": {
              "@type": "Blog",
              "name": "KastoChha Blog",
              "url": "https://kastochhanepal.com/blog"
            }
          }),
        }}
      />

      <HeaderWrapper />

      <h1 className="sr-only">KastoChha Blogs - Page {page}</h1>

      {/* Hero Banner - 100% Natural Brightness & Size matched to original gradient */}
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
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </main>
      </div>

      <Footer />
      <DiscordButton />
    </div>
  );
}

export async function generateStaticParams() {
  const res = await client.getEntries({
    content_type: 'blogPost',
    limit: 1000,
  });

  const totalPages = Math.ceil(res.total / POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}