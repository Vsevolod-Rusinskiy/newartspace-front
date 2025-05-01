import { AboutPage } from '@/src/pages/AboutPage'

export const metadata = {
  title: 'О нас | Галерея молодых и малоизвестных художников',
  description: 'Узнайте больше о нашей галерее, миссии и команде.',
  openGraph: {
    title: 'О нас | Галерея молодых и малоизвестных художников',
    description: 'Узнайте больше о нашей галерее, миссии и команде.',
    url: 'https://newartspace.ru/about',
    type: 'website',
    images: [
      {
        url: 'https://newartspace.ru/img/roses.png',
        width: 1200,
        height: 630,
        alt: 'О нас | Галерея молодых и малоизвестных художников',
      },
    ],
  },
}

export default function Page() {
  // Структурированные данные JSON-LD для страницы О нас
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Галерея молодых и малоизвестных художников «Новое пространство»',
    url: 'https://newartspace.ru/',
    logo: 'https://newartspace.ru/img/logo_artist.png',
    description: 'Галерея молодых и малоизвестных художников Санкт-Петербурга.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт-Петербург',
      addressRegion: 'Санкт-Петербург',
      postalCode: '192029',
      streetAddress:
        'ул. Ново-Рыбинская, д. 19-21, БЦ «Квартал», центральный вход, 2 этаж, пом. 9',
    },
    telephone: '+7 (921) 932-62-15',
    email: '9326215@mail.ru',
    sameAs: ['https://vk.com/public207408538', 'https://t.me/newartspace'],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <AboutPage />
    </>
  )
}
