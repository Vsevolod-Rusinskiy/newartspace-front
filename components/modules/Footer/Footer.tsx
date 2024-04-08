'use client'
import cn from 'classnames'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'
import styles from '@/styles/footer/footer.module.scss'
import { useLang } from '@/hooks/useLang'

export const Footer = () => {
  const burgerIsOpen = useAppSelector((state) => state.modals.burgerMenu)
  const { lang, translations } = useLang()

  return (
    <footer
      className={cn(styles.footer, {
        [styles.hidden]: burgerIsOpen,
      })}
    >
      <div className={`container ${styles.content}`}>
        <div className={styles.menu}>
          <ul className={`list_reset ${styles.nav}`}>
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
          </ul>
          <ul className={styles.nav}>
            <li>
              <Link href='/events'>{translations[lang].main_menu.events}</Link>
            </li>
            <li>
              <Link href='/contacts'>
                {translations[lang].main_menu.contacts}
              </Link>
            </li>
            <li>
              <Link href='#'>{translations[lang].main_menu.return_and_shipping}</Link>
            </li>
            <a href='#'>{translations[lang].main_menu.privacy_policy}</a>
            <a href='#'>{translations[lang].main_menu.agreement}</a>
          </ul>
          <address className={styles.address}>
            <p>{translations[lang].individual.name}</p>
            <p>{translations[lang].individual.inn}</p>
            <p>
              {translations[lang].individual.address1}
              <br /> {translations[lang].individual.address2}
              <br /> {translations[lang].individual.address3}
            </p>
            <p>
              <a href='tel:89219326215'>{translations[lang].individual.phone}</a>
            </p>
            <p>
              <a href='mailto:9326215@mail.ru?subject='>
                E-mail: 9326215@mail.ru
              </a>
            </p>
          </address>
        </div>
        <div className={styles.rights}>
          <p>
            {translations[lang].individual.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
