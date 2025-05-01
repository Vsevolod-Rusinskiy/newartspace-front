import { NamesPageServer } from '@/src/pages/NamesPage'

export const metadata = {
  title: 'Имена | Галерея молодых и малоизвестных художников',
  description:
    'Список художников, представленных в нашей галерее. Биографии, работы и достижения.',
  openGraph: {
    title: 'Имена | Галерея молодых и малоизвестных художников',
    description:
      'Список художников, представленных в нашей галерее. Биографии, работы и достижения.',
    url: 'https://newartspace.ru/names',
    type: 'website',
    images: [
      {
        url: 'https://newartspace.ru/img/roses.png',
        width: 1200,
        height: 630,
        alt: 'Имена | Галерея молодых и малоизвестных художников',
      },
    ],
  },
}

export default function Page() {
  // Структурированные данные JSON-LD для страницы Имена (список художников)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Имена художников | Галерея «Новое пространство»',
    description:
      'Список художников, представленных в нашей галерее. Биографии, работы и достижения.',
    url: 'https://newartspace.ru/names',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Галерея молодых и малоизвестных художников «Новое пространство»',
      url: 'https://newartspace.ru/',
    },
    about: {
      '@type': 'Thing',
      name: 'Художники современного искусства',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: 'https://newartspace.ru/names',
        },
      ],
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
      <NamesPageServer />
    </>
  )
}
