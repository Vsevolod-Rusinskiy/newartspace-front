import { notFound } from 'next/navigation'
import { fetchPaintingById } from '@/src/shared/api/fetch-painting-by-id'
import { PaintingCardClient } from './painting-card-client'
import { Metadata } from 'next'

export const revalidate = 300

// Генерация метаданных на основе данных картины
export async function generateMetadata({
  params,
}: {
  params: { id_slug: string }
}): Promise<Metadata> {
  try {
    // Извлекаем ID из URL
    const [id] = params.id_slug.split('-')
    if (!id || isNaN(Number(id))) return { title: 'Страница не найдена' }

    // Получаем данные картины
    const painting = await fetchPaintingById(id)
    if (!painting) return { title: 'Страница не найдена' }

    // Формируем метаданные
    const title = `${painting.title || 'Картина'} - ${painting.author || 'Художник'} (${
      painting.yearOfCreation || 'N/A'
    })`

    const technique = painting.technique || ''
    const dimensions =
      painting.height && painting.width
        ? `${painting.height}x${painting.width}см`
        : ''
    const year = painting.yearOfCreation ? `${painting.yearOfCreation}г.` : ''

    const description = painting.description
      ? painting.description.substring(0, 160) + '...'
      : `${painting.title || 'Картина'}, ${technique}, ${dimensions}, ${year}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://newartspace.ru/paintings/${params.id_slug}`,
        type: 'article',
        images: [
          {
            url: painting.imgUrl,
            width: 1200,
            height: 630,
            alt: painting.title,
          },
        ],
      },
    }
  } catch (error) {
    return {
      title: 'Картина | Галерея искусства',
      description:
        'Произведение искусства в галерее молодых и малоизвестных художников',
    }
  }
}

export default async function PaintingCardPageServer({
  params,
}: {
  params: { id_slug: string }
}) {
  const [id] = params.id_slug.split('-')
  if (!id || isNaN(Number(id))) notFound()
  const painting = await fetchPaintingById(id)
  if (!painting) notFound()

  // Создаем структурированные данные JSON-LD для произведения искусства
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: painting.title,
    artist: {
      '@type': 'Person',
      name: painting.author,
    },
    artform: painting.technique,
    artMedium: painting.material,
    width: {
      '@type': 'Distance',
      name: `${painting.width} см`,
    },
    height: {
      '@type': 'Distance',
      name: `${painting.height} см`,
    },
    dateCreated: painting.yearOfCreation.toString(),
    description: painting.description,
    image: painting.imgUrl,
    offers: {
      '@type': 'Offer',
      price: painting.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://newartspace.ru/paintings/${params.id_slug}`,
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
      <PaintingCardClient painting={painting} />
    </>
  )
}
