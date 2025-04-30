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

export default HomePage
