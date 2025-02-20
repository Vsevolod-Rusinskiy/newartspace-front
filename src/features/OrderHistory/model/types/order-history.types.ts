interface OrderStatus {
  id: number
  name: string
}

interface Painting {
  id: number
  title: string
  price: number
  imageUrl: string
}

interface OrderItem {
  id: number
  quantity: number
  price: number
  painting: Painting
}

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  totalPrice: number
  createdAt: Date
  orderStatus: OrderStatus
  orderItems: OrderItem[]
}
