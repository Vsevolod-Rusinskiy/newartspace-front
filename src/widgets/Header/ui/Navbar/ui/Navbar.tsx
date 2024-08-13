'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { addOverflowHiddenToBody } from '@/src/shared/lib/common'
import { useLang } from '@/src/shared/hooks/useLang'
import { closeBurgerMenu } from '../model/modalsSlice'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const burgerIsOpen = useAppSelector((state) => state.modals.burgerMenu)
  const dispatch = useAppDispatch()

  const handleCloseMenu = () => {
    addOverflowHiddenToBody()
    dispatch(closeBurgerMenu())
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
          <li>
            <Link href='/about'>{translations[lang].main_menu.about_us}</Link>
          </li>
          <li>
            <Link href='/names'>{translations[lang].main_menu.names}</Link>
          </li>
          <li>
            <Link href='/catalog'>{translations[lang].main_menu.catalog}</Link>
          </li>
          <li>
            <Link href='/another'>{translations[lang].main_menu.another}</Link>
          </li>
          <li>
            <Link href='/services'>
              {translations[lang].main_menu.services}
            </Link>
          </li>
          <li>
            <Link href='/events'>{translations[lang].main_menu.events}</Link>
          </li>
          <li>
            <Link href='/contacts'>
              {translations[lang].main_menu.contacts}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
