'use client'
import { PaintingCardPage } from '@/src/pages/PaintingCardPage'
import { notFound } from 'next/navigation'

interface PaintingCardPageParams {
  params: {
    id_slug: string
  }
}

export default function PaintingCardPageServer({
  params,
}: PaintingCardPageParams) {
  // Парсим id из id_slug (до первого дефиса)
  const [id] = params.id_slug.split('-')
  if (!id || isNaN(Number(id))) {
    notFound()
  }
  // Прокидываем id как paintingCardId (как раньше)
  return <PaintingCardPage params={{ paintingCardId: id }} />
}
