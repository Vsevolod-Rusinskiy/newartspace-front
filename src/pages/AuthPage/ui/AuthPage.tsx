import { Htag } from '@/src/shared/ui/Htag/Htag'
import styles from './AuthPage.module.scss'
import { SignInForm } from '@/src/features/Auth/sign-in/ui/SignInForm/SignInForm'

type AuthPageProps = {
  type: 'register' | 'login'
}

export const AuthPage = ({ type }: AuthPageProps) => {
  const currentAuthTitle = type === 'login' ? 'Войти' : 'Регистрация'

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.content_header}>
          <Htag tag='h1' className={styles.catalog_title}>
            {currentAuthTitle}
          </Htag>
        </div>
        <SignInForm />
      </section>
    </main>
  )
}
