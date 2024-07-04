'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { closeBurgerMenu } from '@/lib/features/modals/modalsSlice'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import LangToggler from '@/components/modules/Header/LangToggler'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/burgerMenu/burgerMenu.module.scss'

const Menu = () => {
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
            <Link href='/catalog'>{translations[lang].main_menu.catalog}</Link>
          </li>
          <li>
            <Link href='/names'>{translations[lang].main_menu.names}</Link>
          </li>
          <li>
            <Link href='/about'>{translations[lang].main_menu.about_us}</Link>
          </li>
          <li>
            <Link href='/services'>
              {translations[lang].main_menu.services}
            </Link>
          </li>
          <li>
            <Link href='/another'>{translations[lang].main_menu.another}</Link>
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
        <LangToggler />
      </div>
    </nav>
  )
}

export default Menu
