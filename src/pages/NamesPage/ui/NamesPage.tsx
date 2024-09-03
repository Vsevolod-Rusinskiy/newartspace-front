import '../../temp/styles.css'
import { Alphabet } from '@/src/pages/NamesPage/ui/Alphabet'
import styles from '@/src/pages/HomePage/ui/HomePage.module.scss'
import Htag from '@/src/shared/ui/Htag/Htag'

export const NamesPage = () => (
  <main className={styles.main}>
    <section className={`container ${styles.content}`}>
      <Htag tag='h1'>Имена художников</Htag>
      <Alphabet />
    </section>
  </main>
)
