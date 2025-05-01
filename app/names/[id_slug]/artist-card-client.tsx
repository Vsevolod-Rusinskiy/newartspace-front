'use client'
import { ArtistCardPage } from '@/src/pages/ArtistCardPage'
import { IArtist } from '@/src/pages/ArtistCardPage/ui/ArtistCardPage'

export function ArtistCardClient({ artist }: { artist: IArtist }) {
  return (
    <ArtistCardPage
      params={{ artistCardId: artist.id.toString() }}
      initialData={artist}
    />
  )
}
