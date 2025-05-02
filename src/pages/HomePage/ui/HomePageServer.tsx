import { fetchPaintings } from '@/src/shared/api/paintings'
import { HomePage } from '../ui/HomePage'

export const HomePageServer = async () => {
  // Получаем данные для первой страницы (SSR)
  const initialData = await fetchPaintings({ page: 1, limit: 9 })
  // Передаём данные в HomePage через props
  return <HomePage initialData={initialData} />
}
