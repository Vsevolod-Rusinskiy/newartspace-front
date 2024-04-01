'use client'
import cn from 'classnames'
import { useAppSelector } from '@/lib/hooks'
import stylesBurgerMenu from '@/styles/burger-menu/burgerMenu.module.scss'
import styles from '@/styles/header/header.module.scss'

const LangToggler = () => {
  const burgerIsOpen = useAppSelector((state) => state.modals.burgerMenu)
  return (
    <div
      className={cn(styles.translation, stylesBurgerMenu.lang, {
        [stylesBurgerMenu.open]: burgerIsOpen,
      })}
    >
      <button className={`btn_reset`}>RU</button>
      <span>/</span>
      <button className={`btn_reset`}>EN</button>
    </div>
  )
}

export default LangToggler
