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
  return <NamesPageServer />
}
