import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/auth/',
        '/profile/',
        '/cart/',
        '/favorites/',
        '/reset-password/',
        '/verify-email/',
        '/forgot-password/',
      ],
    },
    sitemap: 'https://newartspace.ru/sitemap-index.xml',
  }
}
