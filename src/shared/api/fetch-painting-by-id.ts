export async function fetchPaintingById(id: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/paintings/${id}`,
    {
      next: { revalidate: 300 }, // для ISR
    }
  )
  if (!res.ok) {
    return null
  }
  return res.json()
}
