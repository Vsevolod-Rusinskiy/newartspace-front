import Header from '@/components/modules/Header/Header'
import styles from '../../styles/layout/layout.module.scss'
import { Footer } from '@/components/modules/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <div className={styles.content}>
      <main>{children}</main>
    </div>
    <Footer />
  </>
)

export default Layout
