import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
