'use client'

import styles from './AuthPage.module.scss'
import { SignInForm } from '@/src/features/Auth'

export const AuthPage = () => {
  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <SignInForm />
      </section>
    </main>
  )
}
