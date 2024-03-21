import Header from '@/components/modules/Header/Header'
import styles from '../../styles/layout/layout.module.scss'
import { Footer } from '@/components/modules/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.content}>
      <main>{children}</main>
    </div>
    <Footer />
  </div>
)

export default Layout
