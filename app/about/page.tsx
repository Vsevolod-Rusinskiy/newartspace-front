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
  return <AboutPage />
}
