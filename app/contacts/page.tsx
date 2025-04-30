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
  return <ContactsPage />
}
