import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  userName: string | null
  formType: 'login' | 'register'
}

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  formType: 'register',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userName: string }>) {
      console.log('Login action payload:', action.payload)
      state.isLoggedIn = true
      state.userName = action.payload.userName
    },
    logout(state) {
      state.isLoggedIn = false
      state.userName = null
      state.formType = 'register'
    },
    setFormType(state, action: PayloadAction<'login' | 'register'>) {
      state.formType = action.payload
    },
  },
})

export const { login, logout, setFormType } = authSlice.actions
