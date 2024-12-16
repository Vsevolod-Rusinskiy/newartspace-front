import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'

export const useRemoveUser = () => {
  const dispatch = useAppDispatch()

  const removeUser = () => {
    localStorage.removeItem('auth')
    dispatch(logout())
  }

  return removeUser
}
