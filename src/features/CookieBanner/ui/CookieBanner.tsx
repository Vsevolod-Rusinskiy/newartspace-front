import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import styles from './CookieBanner.module.scss'
import { RootState } from '@/src/app/model/redux/store'
import {
  initializeCookieBanner,
  acceptCookie,
} from '../model/cookieBannerSlice'
import { useLang } from '@/src/shared/hooks/useLang'

export const CookieBanner = () => {
  const dispatch = useDispatch()
  const { lang, translations } = useLang()
  const isOpen = useSelector((state: RootState) => state.cookieBanner.isOpen)

  useEffect(() => {
    dispatch(initializeCookieBanner())
  }, [dispatch])

  if (!isOpen) return null

  return (
    <div className={styles.cookie_banner_container}>
      <span className={styles.cookie_banner_text}>
        {translations[lang].cookie_banner.text}
        <Link href='/privacy-policy' className={styles.cookie_banner_link}>
          {translations[lang].cookie_banner.privacy_link}
        </Link>
        .
      </span>
      <button
        className={styles.cookie_banner_button}
        onClick={() => dispatch(acceptCookie())}
      >
        {translations[lang].cookie_banner.accept_button}
      </button>
    </div>
  )
}
