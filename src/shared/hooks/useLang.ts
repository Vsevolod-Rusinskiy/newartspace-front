import { useAppSelector } from '@/src/app/model/hooks'
import translationsJSON from '@/public/translations/translations.json'

export const useLang = () => {
  const lang = useAppSelector((state) => state.language.lang)
  const translations = translationsJSON

  return { lang, translations }
}
