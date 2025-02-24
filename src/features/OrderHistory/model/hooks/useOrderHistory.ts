import { useState, useEffect } from 'react'
import { Order } from '../types/order-history.types'
import { orderHistoryApi } from '../../api/order-history.api'

export const useOrderHistory = () => {
  const [state, setState] = useState({
    orders: [] as Order[],
    isLoading: true,
    error: '',
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderHistoryApi.getUserPurchases()
        setState((prev) => ({ ...prev, orders: data, isLoading: false }))
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: 'Ошибка при загрузке истории покупок',
          isLoading: false,
        }))
        console.error('Ошибка при загрузке истории покупок:', err)
      }
    }

    fetchOrders()
  }, [])

  return state
}
