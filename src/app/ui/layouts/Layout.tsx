import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'
import { OneClickBuyModal } from '@/src/features/OneClickBuy/ui/OneClickBuyModal/OneClickBuyModal'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div>
      <Header />
      {children}
      <Footer />
    </div>
    <Sidebar />
    <OneClickBuyModal />
  </>
)

export default Layout
