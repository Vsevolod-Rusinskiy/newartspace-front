'use client'
import React from 'react'
import '../../temp/styles.css'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './AboutPage.module.scss'
import aboutImage from '../assets/about-image.jpg'
import Image from 'next/image'

export const AboutPage = () => {
  const { lang, translations } = useLang()

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>{translations[lang].page_titles.about}</Htag>
        </div>
        <div className={styles.about_image_container}>
          <Image
            src={aboutImage}
            alt='О нас'
            className={styles.about_image}
            priority
          />
        </div>
        <div className={styles.text_container}>
          <p className={styles.about_text}>
            {translations[lang].about_page.main_text}
          </p>
          <div className={styles.signature_container}>
            <p>
              {translations[lang].about_page.signature} <br />
              {translations[lang].about_page.artist_name}
            </p>
            <p className={styles.photographer_info}>
              {translations[lang].about_page.photographer_info}{' '}
              <a href='tel:+79019715611' className={styles.phone_link}>
                +7 (901) 971-56-11
              </a>
              , {translations[lang].about_page.photographer_site}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
