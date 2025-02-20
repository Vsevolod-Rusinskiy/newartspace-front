'use client'

import { useState, useEffect } from 'react'
import { orderHistoryApi } from '../../api/order-history.api'
import { Order } from '../../model/types/order-history.types'
import styles from './OrderHistory.module.scss'
import Image from 'next/image'
import { formatPrice } from '@/src/shared/lib/helpers/formatPrice'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const data = await orderHistoryApi.getUserPurchases()
        setOrders(data)
      } catch (err) {
        setError('Ошибка при загрузке истории заказов')
        console.error('Ошибка загрузки заказов:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (orders.length === 0) {
    return <div className={styles.empty}>История заказов пуста</div>
  }

  return (
    <div className={styles.order_history}>
      {orders.map((order) => (
        <div key={order.id} className={styles.order_card}>
          <div className={styles.order_header}>
            <div className={styles.order_info}>
              <div className={styles.order_number}>Заказ №{order.id}</div>
              <div className={styles.order_date}>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className={styles.order_status}>{order.orderStatus}</div>
            </div>
            <div className={styles.order_total}>{order.totalPrice} ₽</div>
          </div>

          <div className={styles.order_items}>
            {order.orderItems.map((item) => (
              <div key={item.id} className={styles.order_item}>
                <div className={styles.item_image}>
                  {item.painting?.imgUrl && (
                    <Image
                      src={item.painting.imgUrl}
                      alt={item.painting.title || 'Изображение картины'}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className={styles.item_info}>
                  <div className={styles.item_title}>
                    {item.painting?.title || 'Название отсутствует'}
                  </div>
                  <div className={styles.item_details}>
                    <span>Количество: {item.quantity}</span>
                    <span>Цена: {formatPrice(item.price)} ₽</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
