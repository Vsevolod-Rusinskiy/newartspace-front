import { HomePageServer as HomePage } from '@/src/pages/HomePage'

export const metadata = {
  title: 'Главная | Галерея молодых и малоизвестных художников',
  description:
    'Добро пожаловать в онлайн-галерею современных молодых художников. Каталог работ, события, имена и контакты.',
  openGraph: {
    title: 'Главная | Галерея молодых и малоизвестных художников',
    description:
      'Добро пожаловать в онлайн-галерею современных молодых художников. Каталог работ, события, имена и контакты.',
    url: 'https://newartspace.ru/',
    type: 'website',
    images: [
      {
        url: 'https://newartspace.ru/img/roses.png',
        width: 1200,
        height: 630,
        alt: 'Главная | Галерея молодых и малоизвестных художников',
      },
    ],
  },
}

export default function Page() {
  // Структурированные данные JSON-LD для главной страницы
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Галерея молодых и малоизвестных художников «Новое пространство»',
    url: 'https://newartspace.ru/',
    description:
      'Онлайн-галерея современных молодых художников, картины, выставки и мероприятия.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://newartspace.ru/catalog?search={search_term_string}',
      'query-input': 'required name=search_term_string',
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
      <HomePage />
    </>
  )
}
