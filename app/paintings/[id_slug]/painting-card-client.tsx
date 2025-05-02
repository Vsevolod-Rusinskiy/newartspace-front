'use client'
import { PaintingCardPage } from '@/src/pages/PaintingCardPage'
import { IPainting } from '@/src/pages/PaintingCardPage/types/PaintingCardPage.type'

export function PaintingCardClient({ painting }: { painting: IPainting }) {
  return (
    <PaintingCardPage
      params={{ paintingCardId: painting.id.toString() }}
      initialData={painting}
    />
  )
}
