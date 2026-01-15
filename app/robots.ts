import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',       // Future-proofing for backend routes
        '/*?_rsc=*',   // Prevents indexing Next.js internal data fetching 
      ],
    },
    sitemap: 'https://www.kastochhanepal.com/sitemap.xml',
  }
}