import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { IPainting } from '@/src/entities/Painting'
import { getCartFromServer, updateCartOnServer } from './api/cartApi'
import { RootState } from '@/src/app/model/redux/store'

interface CartState {
  cartIds: number[]
  cartPaintings: {
    data: IPainting[]
    total: number
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  isInitialized: boolean
  isSyncing: boolean
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

export const syncCartWithServer = createAsyncThunk(
  'cart/syncWithServer',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const { cartIds } = state.cart
      const { favoriteIds } = state.favorites

      const response = await updateCartOnServer(cartIds, favoriteIds)
      return response
    } catch (error) {
      return rejectWithValue('Failed to sync cart with server')
    }
  }
)

export const fetchServerCart = createAsyncThunk(
  'cart/fetchFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const serverData = await getCartFromServer()
      return serverData
    } catch (error) {
      return rejectWithValue('Failed to fetch cart from server')
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
  isSyncing: false,
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
    toggleCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.cartIds.indexOf(id)

      if (index === -1) {
        state.cartIds.push(id)
      } else {
        state.cartIds.splice(index, 1)
        state.cartPaintings.data = state.cartPaintings.data.filter(
          (painting) => Number(painting.id) !== id
        )
        state.cartPaintings.total = state.cartPaintings.data.length
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.cartIds))
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
      .addCase(syncCartWithServer.pending, (state) => {
        state.isSyncing = true
      })
      .addCase(syncCartWithServer.fulfilled, (state) => {
        state.isSyncing = false
        state.error = null
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.isSyncing = false
        state.error = action.payload as string
      })
      .addCase(fetchServerCart.fulfilled, (state, action) => {
        const serverCartIds = action.payload.cart
        const localCartIds = getCartFromStorage()

        state.cartIds = Array.from(new Set([...localCartIds, ...serverCartIds]))

        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.cartIds))
        }
      })
  },
})

export const { initializeCart, toggleCart, addToCart, removeFromCart } =
  cartSlice.actions
export default cartSlice.reducer
