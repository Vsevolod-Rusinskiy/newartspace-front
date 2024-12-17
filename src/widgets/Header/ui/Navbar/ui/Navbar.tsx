'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { addOverflowHiddenToBody } from '@/src/shared/lib/common'
import { menuItems } from '@/src/shared/constants/menuItems'
import { useLang } from '@/src/shared/hooks/useLang'
import { actionCloseBurgerMenu } from '../model/burgerMenuModalSlice'
import { setActiveMenu } from '@/src/app/model/activeMenuSlice'
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
  const activeMenu = useAppSelector((state) => state.activeMenu.activeMenu)
  const { lang, translations } = useLang()

  const handleMenuClick = (href: string) => {
    dispatch(setActiveMenu(href))
  }

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
            <li
              key={index}
              className={activeMenu === href ? styles.active : ''}
            >
              <Link
                href={href}
                onClick={() => {
                  handleMenuClick(href)
                  handleCloseMenu()
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
