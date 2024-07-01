'use client'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import stylesBurgerMenu from '@/styles/burgerMenu/burgerMenu.module.scss'
import {
  setEnglishLang,
  setRussianLang,
} from '@/lib/features/language/languageSlice'
import styles from '@/styles/header/header.module.scss'

const LangToggler = () => {
  const burgerIsOpen = useAppSelector((state) => state.modals.burgerMenu)
  const dispatch = useAppDispatch()
  const handleSetRussian = () => dispatch(setRussianLang())
  const handleSetEnglish = () => dispatch(setEnglishLang())

  return (
    <div
      className={cn(styles.translation, stylesBurgerMenu.lang, {
        [stylesBurgerMenu.open]: burgerIsOpen,
      })}
    >
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

export default LangToggler
