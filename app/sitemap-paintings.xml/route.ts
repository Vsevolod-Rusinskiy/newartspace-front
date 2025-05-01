/* eslint-disable */
import { NextResponse } from 'next/server'
import {
  FetchPaintingsParams,
  fetchPaintings,
} from '@/src/shared/api/paintings'

export const revalidate = 43200 // Обновляем раз в 12 часов

export async function GET() {
  const baseUrl = 'https://newartspace.ru'
  const today = new Date().toISOString().split('T')[0]

  // Получаем общее количество картин
  const initialParams: FetchPaintingsParams = {
    page: 1,
    limit: 1,
  }

  try {
    // Получаем общее количество картин
    const initialData = await fetchPaintings(initialParams)
    const totalItems = initialData.total || 0
    const LIMIT = 100 // Количество элементов на страницу
    const totalPages = Math.ceil(totalItems / LIMIT)

    // Начало XML документа
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    // Получаем все картины через пагинацию
    for (let page = 1; page <= totalPages; page++) {
      const params: FetchPaintingsParams = {
        page,
        limit: LIMIT,
      }

      const pageData = await fetchPaintings(params)
      const paintings = pageData.data || []

      // Добавляем каждую картину в sitemap
      paintings.forEach((painting) => {
        // Создаем slug из id и заголовка картины (если есть)
        const slug = painting.title
          ? `${painting.id}-${painting.title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')}`
          : `${painting.id}`

        sitemap += `  <url>
    <loc>${baseUrl}/paintings/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`
      })

      // Если база действительно огромная, можно добавить искусственную задержку
      // чтобы не перегружать API
      if (totalPages > 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    // Закрываем XML документ
    sitemap += `</urlset>`

    // Возвращаем с правильными заголовками
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=43200, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Ошибка при генерации sitemap для картин:', error)

    // В случае ошибки возвращаем пустой, но валидный sitemap
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate',
        },
      }
    )
  }
}
