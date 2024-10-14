'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { addOverflowHiddenToBody } from '@/src/shared/lib/common'
import { menuItems } from '@/src/shared/constants/menuItems'
import { useLang } from '@/src/shared/hooks/useLang'
import { actionCloseBurgerMenu } from '../model/burgerMenuModalSlice'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const burgerIsOpen = useAppSelector(
    (state) => state.burgerMenuModal.burgerMenu
  )
  const dispatch = useAppDispatch()

  const handleCloseMenu = () => {
    addOverflowHiddenToBody()
    dispatch(actionCloseBurgerMenu())
  }
  const { lang, translations } = useLang()
  return (
    <nav className={`${styles.nav_menu} ${burgerIsOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <button
          className={`btn_reset ${styles.nav_menu_close} ${burgerIsOpen ? styles.open : ''}`}
          onClick={handleCloseMenu}
        />
        <ul
          className={`${styles.nav_menu_list} ${burgerIsOpen ? styles.open : ''}`}
        >
          {menuItems(translations, lang).map(({ href, label }, index) => (
            <li key={index}>
              <Link href={href} onClick={handleCloseMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
