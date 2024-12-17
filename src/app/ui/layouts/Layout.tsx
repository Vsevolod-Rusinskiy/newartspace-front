import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'
import { OneClickBuyModal } from '@/src/features/OneClickBuy/ui/OneClickBuyModal/OneClickBuyModal'
import { useGetAuthDataFromLS } from '@/src/shared/hooks/useGetAuthDataFromLS'
import { ReactNode, useEffect } from 'react'
import { useRemoveUserDataFromLSAndState } from '@/src/shared/hooks/useRemoveUserDataFromLSAndState'
import { login } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import { useDispatch } from 'react-redux'

const Layout = ({ children }: { children: ReactNode }) => {
  const authData = useGetAuthDataFromLS()
  const removeUserData = useRemoveUserDataFromLSAndState()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(authData, 555)
    if (!authData || !authData.accessToken || !authData.refreshToken) {
      removeUserData()
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
