import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'

export const useRemoveUserDataFromLSAndState = () => {
  const dispatch = useAppDispatch()

  const removeUserDataFromLSAndState = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth')
    }
    dispatch(logout())
  }

  return removeUserDataFromLSAndState
}
