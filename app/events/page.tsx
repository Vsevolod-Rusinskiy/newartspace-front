import { EventsPageServer } from '@/src/pages/EventsPage'

export const metadata = {
  title: 'События | Галерея молодых и малоизвестных художников',
  description:
    'Актуальные и прошедшие события, выставки и мероприятия галереи.',
  openGraph: {
    title: 'События | Галерея молодых и малоизвестных художников',
    description:
      'Актуальные и прошедшие события, выставки и мероприятия галереи.',
    url: 'https://newartspace.ru/events',
    type: 'website',
    images: [
      {
        url: 'https://newartspace.ru/img/roses.png',
        width: 1200,
        height: 630,
        alt: 'События | Галерея молодых и малоизвестных художников',
      },
    ],
  },
}

export default function Page() {
  // Структурированные данные JSON-LD для страницы событий
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'События и выставки | Галерея «Новое пространство»',
    description:
      'Актуальные и прошедшие события, выставки и мероприятия галереи молодых и малоизвестных художников.',
    url: 'https://newartspace.ru/events',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Галерея молодых и малоизвестных художников «Новое пространство»',
      url: 'https://newartspace.ru/',
    },
    about: {
      '@type': 'Thing',
      name: 'Выставки и мероприятия галереи современного искусства',
    },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      isPartOf: {
        '@id': 'https://newartspace.ru/events',
      },
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
      <EventsPageServer />
    </>
  )
}
