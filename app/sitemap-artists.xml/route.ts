/* eslint-disable */
import { NextResponse } from 'next/server'
import { FetchArtistsParams, fetchArtists } from '@/src/shared/api/artists'

export const revalidate = 43200 // Обновляем раз в 12 часов

export async function GET() {
  const baseUrl = 'https://newartspace.ru'
  const today = new Date().toISOString().split('T')[0]

  // Получаем общее количество художников
  const initialParams: FetchArtistsParams = {
    page: 1,
    limit: 1,
  }

  try {
    // Получаем общее количество художников
    const initialData = await fetchArtists(initialParams)
    const totalItems = initialData.total || 0
    const LIMIT = 100 // Количество элементов на страницу
    const totalPages = Math.ceil(totalItems / LIMIT)

    // Начало XML документа
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    // Получаем всех художников через пагинацию
    for (let page = 1; page <= totalPages; page++) {
      const params: FetchArtistsParams = {
        page,
        limit: LIMIT,
      }

      const pageData = await fetchArtists(params)
      const artists = pageData.data || []

      // Добавляем каждого художника в sitemap
      artists.forEach((artist) => {
        // Создаем slug из id и имени художника
        const slug = artist.artistName
          ? `${artist.id}-${artist.artistName
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')}`
          : `${artist.id}`

        sitemap += `  <url>
    <loc>${baseUrl}/names/${slug}</loc>
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
    console.error('Ошибка при генерации sitemap для художников:', error)

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
