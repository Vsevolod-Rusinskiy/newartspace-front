import Header from '@/components/modules/Header'
import styles from '../../styles/layout/index.module.scss'
import { Footer } from '@/components/modules/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.body}>
      <main>{children}</main>
    </div>
    <Footer />
  </div>
)

export default Layout
