'use client'
import cn from 'classnames'
import Link from 'next/link'
import LogoPNG from '@/components/elements/LogoPNG/LogoPNG'
import UserSVG from '@/components/elements/UserSVG/UserSVG'
import CartSVG from '@/components/elements/СartSVG/CartSVG'
import FavoritesSVG from '@/components/elements/FavoritesSVG/FavoritesSVG'
import HamburgerSVG from '@/components/elements/HamburgerSVG/HamburgerSVG'
import Menu from '@/components/modules/Header/Menu'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { openBurgerMenu } from '@/lib/features/modals/modalsSlice'
import { useAppDispatch } from '@/lib/hooks'
import LangToggler from '@/components/modules/Header/LangToggler'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/header/header.module.scss'

const Header = () => {
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
          <div className={styles.toggler}>
            <LangToggler />
          </div>
          <div className={styles.hamburger}>
            <button className={`btn_reset`} onClick={handleOpenMenu}>
              <HamburgerSVG />
            </button>
          </div>
          <Menu />
        </div>
        <div className={styles.middle}>
          <p className={enSubHeaderClass}>{translations[lang].header.sub_header}</p>
          <p className={enMainHeaderClass}>{translations[lang].header.main_header}</p>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.nav}>
            <ul className={`list_reset`}>
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
                <Link href='/services'>{translations[lang].main_menu.services}</Link>
              </li>
              <li>
                <Link href='/another'>{translations[lang].main_menu.another}</Link>
              </li>
              <li>
                <Link href='/events'>{translations[lang].main_menu.events}</Link>
              </li>
              <li>
                <Link href='/contacts'>{translations[lang].main_menu.contacts}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
