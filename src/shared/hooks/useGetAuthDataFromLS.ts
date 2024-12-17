import { useRemoveUserDataFromLSAndState } from './useRemoveUserDataFromLSAndState'

export const useGetAuthDataFromLS = () => {
  const removeUserDataFromLSAndState = useRemoveUserDataFromLSAndState()

  try {
    if (typeof window !== 'undefined') {
      const lSData = JSON.parse(localStorage.getItem('auth') as string)

      if (!lSData) {
        removeUserDataFromLSAndState()
        return
      }

      return lSData
    }
  } catch (error) {
    removeUserDataFromLSAndState()
  }
}
