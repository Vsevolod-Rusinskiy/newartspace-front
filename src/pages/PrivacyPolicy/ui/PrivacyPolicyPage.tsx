import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import styles from './PrivacyPolicy.module.scss'

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>Политика конфиденциальности</Htag>
        </div>
        <div className={styles.text_container} />
      </section>
    </main>
  )
}
