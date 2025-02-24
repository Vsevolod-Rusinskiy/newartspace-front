import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'
import { Order } from '../model/types/order-history.types'

export const orderHistoryApi = {
  async getUserPurchases(): Promise<Order[]> {
    const authData = getAuthDataFromLS('auth')
    const response = await axiosInstance.get('/profile/purchases', {
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    })
    return response.data
  },
}
