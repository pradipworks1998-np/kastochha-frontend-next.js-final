import { createClient } from "contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import HeaderWrapper from "../../../components/HeaderWrapper";
import { Footer } from "../../../components/Footer";
import DiscordButton from "../../../components/DiscordButton";
import Link from "next/link";
import { BlogPostSkeleton } from "../../../types";
import { Metadata } from "next";
import Script from "next/script";

export const revalidate = 3600; 
export const dynamicParams = true;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// --- Helpers ---
const slugify = (text: string) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

async function getPost(slug: string) {
  const res = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost", "fields.slug": slug, include: 2, limit: 1,
  } as any);
  return res.items[0] as any;
}

async function getMorePosts(currentSlug: string) {
  const res = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost", "fields.slug[ne]": currentSlug, limit: 3, order: ['-fields.publishedAt'] as any, 
  } as any); 
  return res.items;
}

function getPlainText(node: any): string {
  if (node.nodeType === 'text') return node.value;
  if (node.content && Array.isArray(node.content)) return node.content.map(getPlainText).join("");
  return "";
}

function extractHeadings(content: any[]) {
  if (!content || !Array.isArray(content)) return [];
  return content
    .filter((node) => node.nodeType === BLOCKS.HEADING_2 || node.nodeType === BLOCKS.HEADING_3)
    .map((node) => {
      const text = getPlainText(node);
      return { text: text.trim(), id: slugify(text), level: node.nodeType };
    })
    .filter(h => h.text !== "");
}

// --- Metadata Generator (Next.js 15 SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const { title, metaTitle, metaDescription, featuredImage } = post.fields as any;
  const siteUrl = "https://www.kastochhanepal.com";
  const ogImage = featuredImage?.fields?.file?.url ? `https:${featuredImage.fields.file.url}` : `${siteUrl}/og-fallback.jpg`;

  return {
    title: `${metaTitle || title} | KastoChha`,
    description: metaDescription || "Expert local insights from Nepal.",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: metaTitle || title,
      description: metaDescription || "Expert local insights from Nepal.",
      url: `${siteUrl}/blog/${slug}`,
      siteName: "KastoChha",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description: metaDescription || "Expert local insights from Nepal.",
      images: [ogImage],
    },
  };
}

// --- Main Page Component ---
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const latestPostsFallback = await getMorePosts(slug);

  if (!post) notFound(); 
  const { fields } = post;
  
  const manualRelated = (fields as any).relatedPost || [];
  const sidebarPosts = manualRelated.length > 0 ? manualRelated : latestPostsFallback;
  const headings = extractHeadings(fields.body?.content);
  const siteUrl = "https://www.kastochhanepal.com";
  const shareUrl = `${siteUrl}/blog/${slug}`;

  // --- Schema Logic ---
  const faqData = (fields as any).faq; 
  const faqSchema = Array.isArray(faqData) && faqData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": fields.title, "item": shareUrl }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": fields.title,
    "image": fields.featuredImage?.fields?.file?.url ? [`https:${fields.featuredImage.fields.file.url}`] : [],
    "datePublished": (fields as any).publishedAt,
    "dateModified": post.sys?.updatedAt || (fields as any).publishedAt,
    "author": [{
        "@type": "Person",
        "name": (fields as any).author?.fields?.name || "KastoChha",
        "url": siteUrl
    }],
    "publisher": {
        "@type": "Organization",
        "name": "KastoChha",
        "logo": { "@type": "ImageObject", "url": `${siteUrl}/logo.png` }
    },
    "mainEntityOfPage": shareUrl,
    "description": (fields as any).metaDescription || ""
  };

  const renderOptions: Options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} target="_blank" className="text-blue-600 underline font-medium hover:text-blue-800">{children}</a>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-slate-700 leading-relaxed text-lg">{children}</p>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 id={slugify(getPlainText(node))} className="scroll-mt-24 text-2xl font-bold mt-12 mb-4 text-slate-900 border-b pb-1 border-slate-100 italic">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 id={slugify(getPlainText(node))} className="scroll-mt-24 text-xl font-bold mt-8 mb-3 text-slate-800">{children}</h3>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => <img src={`https:${node.data.target.fields.file.url}`} alt={node.data.target.fields.title} className="rounded-2xl my-10 w-full shadow-sm" />,
    },
  };

  return (
    <div className="flex flex-col min-h-screen pt-6 md:pt-10 lg:pt-12 bg-white">
      {faqSchema && <Script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>}
      <Script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</Script>
      <Script id="article-schema" type="application/ld+json">{JSON.stringify(articleSchema)}</Script>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .kasto-gradient { background: linear-gradient(135deg, #FF4B4B 0%, #1E40AF 100%); }
        .kasto-text-gradient-hover:hover {
          background: linear-gradient(135deg, #FF4B4B 0%, #1E40AF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      <HeaderWrapper />
      
      <main className="flex-1 max-w-6xl mx-auto px-6 pt-2 pb-24 w-full">
        <header className="max-w-4xl mx-auto text-left mb-12">
          <nav className="mb-4 flex flex-wrap items-center justify-between gap-4">
             <Link href="/blog" className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] hover:underline">
               â† BACK TO ALL STORIES
             </Link>
             <div className="flex gap-2">
               {(fields as any).categories?.map((cat: string) => (
                 <span key={cat} className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-widest rounded-full">{cat}</span>
               ))}
             </div>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 italic leading-tight">{fields.title}</h1>

          <div className="flex items-center justify-start gap-3 text-xs md:text-sm text-slate-500 mb-8 font-medium">
            <span className="text-slate-900 font-bold uppercase tracking-tighter">By {fields.author?.fields?.name || "KastoChha"}</span>
            <span className="opacity-30">|</span>
            <span>4 min read</span>
            <span className="opacity-30">|</span>
            <span>{new Date((fields as any).publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {fields.featuredImage?.fields?.file?.url && (
            <img src={`https:${fields.featuredImage.fields.file.url}`} className="w-full rounded-3xl shadow-lg h-[250px] md:h-[450px] object-cover" alt={fields.title} />
          )}
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Mobile TOC */}
          {headings.length > 0 && (
            <div className="w-full lg:hidden order-1 mb-8 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-900 pb-2">Table of Contents</h4>
              <ul className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                {headings.map((h, i) => (
                  <li key={i} className={h.level === 'heading-3' ? "ml-4" : ""}>
                    <a href={`#${h.id}`} className="text-slate-500 hover:text-blue-600 text-[13px] block leading-snug transition-all">{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article */}
          <div className="flex-1 lg:max-w-[65%] order-2 lg:order-1 w-full">
            {(fields as any).excerpt && (
              <div className="mb-10 p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 block">TL;DR</span>
                <div className="text-xl text-slate-700 italic leading-relaxed font-medium">
                  {documentToReactComponents((fields as any).excerpt, renderOptions)}
                </div>
              </div>
            )}

            <article className="prose prose-slate max-w-none prose-lg">
              {documentToReactComponents(fields.body as any, renderOptions)}
            </article>

            {/* FAQ */}
            {Array.isArray(faqData) && faqData.length > 0 && (
              <section className="mt-12 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 italic">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqData.map((item: any, index: number) => (
                    <div key={index} className="border-b border-slate-50 pb-6 last:border-0">
                      <h4 className="text-lg font-bold text-slate-800 mb-3">{item.question}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author */}
            {fields.author?.fields && (
                <section className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {fields.author.fields.profilePicture?.fields?.file?.url && (
                    <img src={`https:${fields.author.fields.profilePicture.fields.file.url}`} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" alt="" />
                  )}
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">About the Author</span>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{fields.author.fields.name}</h4>
                    <p className="text-slate-600 italic text-sm leading-relaxed">"{fields.author.fields.bio}"</p>
                  </div>
                </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[35%] lg:sticky lg:top-10 self-start space-y-6 order-3 lg:order-2">
            {headings.length > 0 && (
              <div className="hidden lg:block p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-900 pb-2">Table of Contents</h4>
                <ul className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  {headings.map((h, i) => (
                    <li key={i} className={h.level === 'heading-3' ? "ml-4" : ""}>
                      <a href={`#${h.id}`} className="text-slate-500 hover:text-blue-600 text-[13px] block leading-snug transition-all">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sidebarPosts.length > 0 && (
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-900 pb-2">
                  {manualRelated.length > 0 ? "Hand-picked for you" : "Up Next"}
                </h4>
                <div className="space-y-4">
                  {sidebarPosts.map((p: any) => (
                    <Link key={p.sys.id} href={`/blog/${p.fields.slug}`} className="group flex gap-3 items-center">
                      <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                         {p.fields.featuredImage?.fields?.file?.url && (
                           <img src={`https:${p.fields.featuredImage.fields.file.url}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                         )}
                      </div>
                      <h5 className="text-[12px] font-semibold text-slate-800 kasto-text-gradient-hover leading-tight line-clamp-2 transition-all">{p.fields.title}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 kasto-gradient rounded-3xl text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Share Story</span>
                <div className="flex gap-4">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" className="hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" className="hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" className="hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
              <DiscordButton />
            </div>
          </aside>
        </div>

        {/* Bottom Recommendations */}
        {latestPostsFallback.length > 0 && (
          <section className="mt-16 border-t border-slate-100 pt-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-10 italic">You Might Also Like These</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {latestPostsFallback.map((p: any) => (
                <Link key={p.sys.id} href={`/blog/${p.fields.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl mb-5 h-52 bg-slate-100 border border-slate-50">
                    {p.fields.featuredImage?.fields?.file?.url && (
                      <img src={`https:${p.fields.featuredImage.fields.file.url}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.fields.title} />
                    )}
                  </div>
                  <h4 className="font-bold text-xl text-slate-900 kasto-text-gradient-hover transition-all duration-300 leading-tight">{p.fields.title}</h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}