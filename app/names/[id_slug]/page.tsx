import { notFound } from 'next/navigation'
import { fetchArtistById } from '@/src/shared/api/fetch-artist-by-id'
import { ArtistCardClient } from './artist-card-client'
import { Metadata } from 'next'

export const revalidate = 300

// Генерация метаданных на основе данных художника
export async function generateMetadata({
  params,
}: {
  params: { id_slug: string }
}): Promise<Metadata> {
  try {
    // Извлекаем ID из URL
    const [id] = params.id_slug.split('-')
    if (!id) return { title: 'Страница не найдена' }

    // Получаем данные художника
    const artist = await fetchArtistById(id)
    if (!artist) return { title: 'Страница не найдена' }

    // Формируем канонический URL
    const canonicalUrl = `https://newartspace.ru/names/${params.id_slug}`

    // Формируем мета-данные
    return {
      title: `${artist.artistName} | Галерея молодых и малоизвестных художников`,
      description: artist.artistDescription
        ? artist.artistDescription.substring(0, 160) + '...'
        : `Ознакомьтесь с работами художника ${artist.artistName} в нашей галерее.`,
      openGraph: {
        title: `${artist.artistName} | Галерея молодых и малоизвестных художников`,
        description: artist.artistDescription
          ? artist.artistDescription.substring(0, 160) + '...'
          : `Ознакомьтесь с работами художника ${artist.artistName} в нашей галерее.`,
        url: canonicalUrl,
        type: 'profile',
        images: [
          {
            url: artist.imgUrl,
            width: 1200,
            height: 630,
            alt: artist.artistName,
          },
        ],
      },
      // Добавляем каноническую ссылку в alternates
      alternates: {
        canonical: canonicalUrl,
      },
    }
  } catch (error) {
    return {
      title: 'Страница художника | Галерея',
      description:
        'Страница художника в галерее молодых и малоизвестных художников',
    }
  }
}

export default async function ArtistCardPageServer({
  params,
}: {
  params: { id_slug: string }
}) {
  const [id] = params.id_slug.split('-')
  if (!id) notFound()
  const artist = await fetchArtistById(id)
  if (!artist) notFound()

  // Создаем структурированные данные JSON-LD для художника
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.artistName,
    description: artist.artistDescription,
    image: artist.imgUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://newartspace.ru/names/${params.id_slug}`,
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ArtistCardClient artist={artist} />
    </>
  )
}
