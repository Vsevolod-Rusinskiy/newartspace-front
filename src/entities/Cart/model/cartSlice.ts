import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { IPainting } from '@/src/entities/Painting'

interface CartState {
  cartIds: number[]
  cartPaintings: {
    data: IPainting[]
    total: number
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  isInitialized: boolean
}

const getCartFromStorage = (): number[] => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart).map(Number) : []
  }
  return []
}

export const fetchCartPaintings = createAsyncThunk<IPainting[], void>(
  'cart/fetchCartPaintings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState }
      const { cartIds } = state.cart

      if (!cartIds.length) return []

      const response = await fetch(
        `${API_BASE_URL}/paintings/getMany/${cartIds.join(',')}`
      )

      if (!response.ok) {
        return rejectWithValue('Failed to fetch cart paintings')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to load cart paintings')
    }
  }
)

const initialState: CartState = {
  cartIds: [],
  cartPaintings: {
    data: [],
    total: 0,
  },
  loading: 'idle',
  error: null,
  isInitialized: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart: (state) => {
      if (!state.isInitialized) {
        state.cartIds = getCartFromStorage()
        state.isInitialized = true
      }
    },
    addToCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (!state.cartIds.includes(id)) {
        state.cartIds.push(id)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.cartIds))
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.cartIds.indexOf(id)

      if (index !== -1) {
        state.cartIds.splice(index, 1)
        state.cartPaintings.data = state.cartPaintings.data.filter(
          (painting) => Number(painting.id) !== id
        )
        state.cartPaintings.total = state.cartPaintings.data.length

        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.cartIds))
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartPaintings.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchCartPaintings.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.cartPaintings.data = action.payload
        state.cartPaintings.total = action.payload.length
      })
      .addCase(fetchCartPaintings.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export const { initializeCart, addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
