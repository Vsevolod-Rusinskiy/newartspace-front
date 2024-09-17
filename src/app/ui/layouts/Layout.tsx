import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div>
      <Header />
      {children}
      <Footer />
    </div>
    <Sidebar />
  </>
)

export default Layout
