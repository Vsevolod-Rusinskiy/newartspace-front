import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'
import { OneClickBuyModal } from '@/src/features/OneClickBuy/ui/OneClickBuyModal/OneClickBuyModal'
import { useEffect } from 'react'
import { ReactNode } from 'react'
import { logout, login } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import {
  getAuthDataFromLS,
  removeUserDataFromLS,
} from '@/src/shared/lib/common'
import { useDispatch } from 'react-redux'

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const authData = getAuthDataFromLS('auth')
  useEffect(() => {
    if (!authData || !authData.accessToken || !authData.refreshToken) {
      removeUserDataFromLS('auth')
      dispatch(logout())
    } else {
      dispatch(login({ userName: authData.userName }))
    }
  }, [])

  return (
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
}

export default Layout
