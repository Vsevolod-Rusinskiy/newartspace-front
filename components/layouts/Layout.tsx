import Header from '@/components/modules/Header/Header'
import { Footer } from '@/components/modules/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
