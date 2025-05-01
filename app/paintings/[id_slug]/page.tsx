import { notFound } from 'next/navigation'
import { fetchPaintingById } from '@/src/shared/api/fetch-painting-by-id'
import { PaintingCardClient } from './painting-card-client'

export const revalidate = 300

export default async function PaintingCardPageServer({
  params,
}: {
  params: { id_slug: string }
}) {
  const [id] = params.id_slug.split('-')
  if (!id || isNaN(Number(id))) notFound()
  const painting = await fetchPaintingById(id)
  if (!painting) notFound()
  return <PaintingCardClient painting={painting} />
}
