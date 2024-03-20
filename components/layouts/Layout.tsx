import Header from '@/components/modules/Header'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout
