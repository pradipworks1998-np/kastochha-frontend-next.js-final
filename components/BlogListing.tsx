import Link from "next/link";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

interface BlogListingProps {
  posts: any[];
}

const EXCERPT_LIMIT = 180;

export default function BlogListing({ posts }: BlogListingProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .kasto-text-gradient-hover:hover {
          background: linear-gradient(135deg, #FF4B4B 0%, #1E40AF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
        }
      `}} />

      <section
        aria-label="Blog articles"
        className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => {
          const { fields, sys } = post;
          
          const plainExcerpt = fields.excerpt
            ? documentToPlainTextString(fields.excerpt)
            : fields.metaDescription || "";

          const trimmedExcerpt =
            plainExcerpt.length > EXCERPT_LIMIT
              ? plainExcerpt.slice(0, EXCERPT_LIMIT) + "..."
              : plainExcerpt;

          return (
            <article key={sys.id} className="group flex flex-col">
              {/* Image Container */}
              {fields.featuredImage && (
                <Link
                  href={`/blog/${fields.slug}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-white shadow-sm block"
                >
                  <img
                    src={`https:${fields.featuredImage.fields.file.url}`}
                    alt={fields.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {fields.categories?.[0] && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-widest rounded-full text-slate-900 shadow-sm">
                      {fields.categories[0]}
                    </span>
                  )}
                </Link>
              )}

              {/* Title with Gradient Hover */}
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-3 italic">
                <Link href={`/blog/${fields.slug}`} className="kasto-text-gradient-hover block">
                  {fields.title}
                </Link>
              </h2>

              {trimmedExcerpt && (
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {trimmedExcerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="mt-auto flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-slate-900">By {fields.author?.fields?.name || "KastoChha"}</span>
                <span className="opacity-20">|</span>
                <span>
                  {fields.publishedAt 
                    ? new Date(fields.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : "Recently"}
                </span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}