import { useRemoveUser } from './useRemoveUser'

export const useGetAuthDataFromLS = () => {
  const removeUser = useRemoveUser()

  try {
    const lSData = JSON.parse(localStorage.getItem('auth') as string)

    if (!lSData) {
      removeUser()
      return
    }

    return lSData
  } catch (error) {
    removeUser()
  }
}
