'use client'
import cn from 'classnames'
import { useAppDispatch } from '@/src/app/model/hooks'
import { setEnglishLang, setRussianLang } from '@/src/app/model/languageSlice'
import styles from '@/src/widgets/Header/ui/header.module.scss'

export const LangToggler = () => {
  const dispatch = useAppDispatch()
  const handleSetRussian = () => dispatch(setRussianLang())
  const handleSetEnglish = () => dispatch(setEnglishLang())

  return (
    <div className={cn(styles.translation)}>
      <button className={`btn_reset`} onClick={handleSetRussian}>
        RU
      </button>
      <span>/</span>
      <button className={`btn_reset`} onClick={handleSetEnglish}>
        EN
      </button>
    </div>
  )
}
