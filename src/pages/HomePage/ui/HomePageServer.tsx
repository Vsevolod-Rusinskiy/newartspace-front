import { fetchPaintings } from '@/src/shared/api/paintings'
import { HomePage } from '../ui/HomePage'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export const HomePageServer = async () => {
  // Получаем данные для первой страницы (SSR) без фильтра стиля
  // Это обеспечит данные по умолчанию для экрана с большими кнопками
  const initialData = await fetchPaintings({ page: 1, limit: 9 })

  // Предзагружаем данные для двух основных стилей,
  // чтобы они были в кэше браузера при клике пользователя
  await Promise.all([
    fetch(`${API_BASE_URL}/paintings?page=1&limit=9&artStyle=Традиции`),
    fetch(`${API_BASE_URL}/paintings?page=1&limit=9&artStyle=Современность`),
  ])

  // Передаём данные в HomePage через props
  return <HomePage initialData={initialData} />
}
