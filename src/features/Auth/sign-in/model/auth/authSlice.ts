import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  user: { name: string } | null
  formType: 'login' | 'register'
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  formType: 'register',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string }>) {
      state.isLoggedIn = true
      state.user = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
    setFormType(state, action: PayloadAction<'login' | 'register'>) {
      state.formType = action.payload
    },
  },
})

export const { login, logout, setFormType } = authSlice.actions
