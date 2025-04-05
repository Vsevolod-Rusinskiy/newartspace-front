'use client'
import cn from 'classnames'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { setEnglishLang, setRussianLang } from '@/src/app/model/languageSlice'
import styles from '@/src/widgets/Header/ui/header.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

export const LangToggler = () => {
  const dispatch = useAppDispatch()
  const { lang } = useLang()

  const handleSetRussian = () => dispatch(setRussianLang())
  const handleSetEnglish = () => dispatch(setEnglishLang())

  return (
    <div className={cn(styles.translation)}>
      <button
        className={cn('btn_reset', {
          [styles.active_lang]: lang === 'ru',
        })}
        onClick={handleSetRussian}
      >
        RU
      </button>
      <span>/</span>
      <button
        className={cn('btn_reset', {
          [styles.active_lang]: lang === 'en',
        })}
        onClick={handleSetEnglish}
      >
        EN
      </button>
    </div>
  )
}
