import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'
import { Modal } from '@/src/shared/ui/modals/Modal/Modal'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div>
      <Header />
      {children}
      <Footer />
    </div>
    <Sidebar />
    <Modal />
  </>
)

export default Layout
