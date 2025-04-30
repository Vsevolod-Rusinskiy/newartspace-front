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
  return <EventsPageServer />
}
