// interface OrderStatus {
//   id: number
//   name: string
// }

// interface Painting {
//   id: number
//   title: string
//   price: number
//   imageUrl: string
// }

// interface OrderItem {
//   id: number
//   quantity: number
//   price: number
//   painting: Painting
// }

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
  shippingAddress: string | null
  totalPrice: number
  statusId: number
  userId: number
  createdAt: string
  updatedAt: string
  orderItems: {
    id: number
    orderId: number
    paintingId: number
    quantity: number
    price: number
    createdAt: string
    updatedAt: string
    painting: {
      id: number
      title: string
      price: number
      imgUrl: string
    }
  }[]
  status: {
    id: number
    displayName: string
  }
}
