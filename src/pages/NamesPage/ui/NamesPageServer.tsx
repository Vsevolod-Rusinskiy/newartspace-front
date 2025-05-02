import { fetchArtists } from '@/src/shared/api/artists'
import { NamesPage } from './NamesPage'

export const NamesPageServer = async () => {
  // Получаем данные для первой страницы (SSR)
  const initialData = await fetchArtists({ page: 1, limit: 8 })
  // Передаём данные в NamesPage через props
  return <NamesPage initialData={initialData} />
}
