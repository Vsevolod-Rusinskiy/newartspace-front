import { EventCardPage } from '@/src/pages/EventCardPage/ui/EventCardPage'

interface PageProps {
  params: Promise<{ eventsCardId: string }>
}

export default async function EventsCardPageServer({ params }: PageProps) {
  const { eventsCardId } = await params

  return <EventCardPage eventsCardId={eventsCardId} />
}
