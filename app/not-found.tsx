import Link from 'next/link'
import { Metadata } from 'next'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import styles from './error-handlers/not-found.module.scss'

export const metadata: Metadata = {
  title: 'Страница не найдена | Галерея искусства',
  description: 'К сожалению, запрашиваемая страница не найдена.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className={styles.not_found_container}>
      <NoData />
      <h2 className={styles.not_found_title}>Страница не найдена</h2>
      <p className={styles.not_found_message}>
        Извините, запрашиваемая страница не существует или была перемещена.
      </p>
      <div className={styles.buttons_container}>
        <Link href='/' className={styles.primary_button}>
          На главную
        </Link>
      </div>
    </div>
  )
}
