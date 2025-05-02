import { NextResponse } from 'next/server'

export const revalidate = 86400 // Обновляем раз в день

export async function GET() {
  const baseUrl = 'https://newartspace.ru'
  const today = new Date().toISOString().split('T')[0] // Формат YYYY-MM-DD

  // XML-заголовок и начало документа
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-paintings.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-artists.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`

  // Возвращаем XML с правильным заголовком
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  })
}
