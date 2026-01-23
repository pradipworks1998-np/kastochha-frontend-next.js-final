import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',     // Protects backend routes
          '/admin',    // Protects potential admin routes
        ],
      },
    ],
    sitemap: 'https://www.kastochhanepal.com/sitemap.xml',
  }
}