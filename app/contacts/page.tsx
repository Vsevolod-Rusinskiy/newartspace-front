import { ContactsPage } from '@/src/pages/ContactsPage'

export const metadata = {
  title: 'Контакты | Галерея молодых и малоизвестных художников',
  description:
    'Свяжитесь с нашей галереей — адрес, телефон, email и форма обратной связи.',
  openGraph: {
    title: 'Контакты | Галерея молодых и малоизвестных художников',
    description:
      'Свяжитесь с нашей галереей — адрес, телефон, email и форма обратной связи.',
    url: 'https://newartspace.ru/contacts',
    type: 'website',
    images: [
      {
        url: 'https://newartspace.ru/img/roses.png',
        width: 1200,
        height: 630,
        alt: 'Контакты | Галерея молодых и малоизвестных художников',
      },
    ],
  },
}

export default function Page() {
  // Структурированные данные JSON-LD для страницы Контакты
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7 (921) 932-62-15',
      email: '9326215@mail.ru',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English'],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '13:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        description: 'По предварительной договоренности',
      },
    ],
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
      <ContactsPage />
    </>
  )
}
