import { notFound } from 'next/navigation'
import { fetchArtistById } from '@/src/shared/api/fetch-artist-by-id'
import { ArtistCardClient } from './artist-card-client'

export const revalidate = 300

export default async function ArtistCardPageServer({
  params,
}: {
  params: { id_slug: string }
}) {
  const [id] = params.id_slug.split('-')
  if (!id) notFound()
  const artist = await fetchArtistById(id)
  if (!artist) notFound()
  return <ArtistCardClient artist={artist} />
}
