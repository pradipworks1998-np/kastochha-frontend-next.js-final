import { MetadataRoute } from 'next'
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

async function getBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      // We must select fields.slug AND sys metadata
      select: ['fields.slug', 'sys.updatedAt', 'sys.id'], 
    })

    return entries.items.map((item: any) => ({
      // Accessing the fields.slug correctly
      slug: item.fields.slug,
      // sys.updatedAt is a top-level property in the item object
      updated: new Date(item.sys.updatedAt),
    }))
  } catch (error) {
    console.error("Contentful Sitemap Error:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kastochhanepal.com'
  
  // Base Pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
  ]

  // Dynamic Contentful Posts
  const posts = await getBlogPosts()
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}