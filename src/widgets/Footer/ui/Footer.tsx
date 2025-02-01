'use client'
import cn from 'classnames'
import Link from 'next/link'
import { useAppSelector } from '@/src/app/model/redux/hooks'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './footer.module.scss'

export const Footer = () => {
  const burgerIsOpen = useAppSelector(
    (state) => state.burgerMenuModal.burgerMenu
  )
  const { lang, translations } = useLang()

  const firstMenuItems = [
    { href: '/about', label: translations[lang].main_menu.about_us },
    { href: '/names', label: translations[lang].main_menu.names },
    { href: '/catalog', label: translations[lang].main_menu.catalog },
    // { href: '/another', label: translations[lang].main_menu.another },
    // { href: '/services', label: translations[lang].main_menu.services },
  ]

  const secondMenuItems = [
    { href: '/events', label: translations[lang].main_menu.events },
    { href: '/contacts', label: translations[lang].main_menu.contacts },
    { href: '#', label: translations[lang].main_menu.return_and_shipping },
    { href: '#', label: translations[lang].main_menu.privacy_policy },
    { href: '#', label: translations[lang].main_menu.agreement },
  ]

  return (
    <footer
      className={cn(styles.footer, {
        [styles.hidden]: burgerIsOpen,
      })}
    >
      <div className={`container ${styles.content}`}>
        <div className={styles.menu}>
          <ul className={`list_reset ${styles.nav}`}>
            {firstMenuItems.map(({ href, label }, index) => (
              <li key={index}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.nav}>
            {secondMenuItems.map(({ href, label }, index) => (
              <li key={index}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <address className={styles.address}>
            <p>{translations[lang].individual.name}</p>
            <p>{translations[lang].individual.inn}</p>
            <p className={styles.address_city}>
              {translations[lang].individual.address1}
              <br /> {translations[lang].individual.address2}
              <br /> {translations[lang].individual.address3}
            </p>
            <p>
              <Link href='tel:89219326215'>
                {translations[lang].individual.phone}
              </Link>
            </p>
            <p>
              <Link href='mailto:9326215@mail.ru?subject='>
                E-mail: 9326215@mail.ru
              </Link>
            </p>
          </address>
        </div>
        <div className={styles.rights}>
          <p>{translations[lang].individual.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
