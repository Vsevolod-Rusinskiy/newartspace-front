'use client'
import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './PrivacyPolicy.module.scss'

export const PrivacyPolicyPage: React.FC = () => {
  const { lang, translations } = useLang()

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>{translations[lang].page_titles.privacy}</Htag>
        </div>
        <div className={styles.text_container}>
          <div className={styles.privacy_block}>
            <p className={styles.privacy_title}>
              {translations[lang].privacy_page.info_title}
            </p>
            <p>{translations[lang].privacy_page.info_text}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
