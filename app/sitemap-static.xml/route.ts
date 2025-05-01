import { NextResponse } from 'next/server'

export const revalidate = 86400 // Обновляем раз в день

export async function GET() {
  const baseUrl = 'https://newartspace.ru'
  const today = new Date().toISOString().split('T')[0]

  // Список статических страниц с их приоритетами и частотой обновления
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contacts', changefreq: 'monthly', priority: '0.8' },
    { url: '/events', changefreq: 'weekly', priority: '0.9' },
    { url: '/names', changefreq: 'weekly', priority: '0.9' },
    { url: '/catalog', changefreq: 'daily', priority: '0.9' },
  ]

  // Начало XML документа
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  // Добавляем каждую страницу в sitemap
  staticPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`
  })

  // Закрываем XML документ
  sitemap += `</urlset>`

  // Возвращаем с правильными заголовками
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  })
}
