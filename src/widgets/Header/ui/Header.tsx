'use client'
import cn from 'classnames'
import Link from 'next/link'
import LogoPNG from '@/src/shared/ui/svgIcons/LogoPNG'
import UserSVG from '@/src/shared/ui/svgIcons/UserSVG'
import CartSVG from '@/src/shared/ui/svgIcons/CartSVG'
import FavoritesSVG from '@/src/shared/ui/svgIcons/FavoritesSVG'
import HamburgerSVG from '@/src/shared/ui/svgIcons/HamburgerSVG'
import { addOverflowHiddenToBody } from '@/src/shared/lib/common'
import { Navbar } from './Navbar/ui/Navbar'
import { openBurgerMenu } from './Navbar/model/modalsSlice'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { LangToggler } from './LangToggler/ui/LangToggler'
import { useLang } from '@/src/shared/hooks/useLang'
import { menuItems } from '@/src/shared/constants/menuItems'

import styles from './header.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    dispatch(openBurgerMenu())
  }
  const { lang, translations } = useLang()

  const enMainHeaderClass = cn({
    [styles.en_main_header]: lang === 'en',
  })

  const enSubHeaderClass = cn({
    [styles.en_sub_header]: lang === 'en',
  })

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <LogoPNG />
            <div className={styles.gallery}>
              <p>{translations[lang].header.company_name1}</p>
              <p>{translations[lang].header.company_name2}</p>
              <p>{translations[lang].header.company_name3}</p>
            </div>
          </div>
          <div className={styles.social}>
            <a
              className={styles.tg}
              href='https://t.me/newartspace'
              target='_blank'
            />
            <a
              className={styles.vk}
              href='https://vk.com/public207408538'
              target='_blank'
            />
          </div>
          <div className={styles.contacts}>
            <a className={styles.email} href='mailto:rodoc461@aersm.com'>
              9326215@mail.ru
            </a>
            <a className={styles.phone} href='tel:89219326215'>
              +7 (921) 932-62-15
            </a>
          </div>
          <div className={styles.work_time}>
            <p>{translations[lang].header.schedule}</p>
            <p>{translations[lang].header.by_appointment}</p>
          </div>
          <div className={styles.links}>
            <div className={styles.cart}>
              <Link href='/'>
                <CartSVG />
              </Link>
            </div>
            <div className={styles.user}>
              <Link href='/'>
                <UserSVG />
              </Link>
            </div>
            <div className={styles.favorites}>
              <Link href='/'>
                <FavoritesSVG />
              </Link>
            </div>
          </div>
          <LangToggler />
          <div className={styles.hamburger}>
            <button className={`btn_reset`} onClick={handleOpenMenu}>
              <HamburgerSVG />
            </button>
          </div>
          <Navbar />
        </div>
        <div className={styles.middle}>
          <Link href='/' className={enSubHeaderClass}>
            {translations[lang].header.sub_header}
          </Link>
          <Link href='/' className={enMainHeaderClass}>
            {translations[lang].header.main_header}
          </Link>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.nav}>
            <ul className={`list_reset`}>
              {menuItems(translations, lang).map(({ href, label }, index) => (
                <li key={index}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
