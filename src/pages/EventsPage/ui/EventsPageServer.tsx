import { fetch_events } from '@/src/shared/api/events'
import { EventsPage } from './EventsPage'

export const EventsPageServer = async () => {
  const initialData = await fetch_events({ page: 1, limit: 9 })
  return <EventsPage initialData={initialData} />
}
