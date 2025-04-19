import { createSlice } from '@reduxjs/toolkit'

interface CookieBannerState {
  isOpen: boolean
  hasAcceptedCookie: boolean
}

const initialState: CookieBannerState = {
  isOpen: false,
  hasAcceptedCookie: false,
}

const COOKIE_KEY = 'hasAcceptedCookie'

export const cookieBannerSlice = createSlice({
  name: 'cookieBanner',
  initialState,
  reducers: {
    initializeCookieBanner: (state) => {
      if (typeof window !== 'undefined') {
        const accepted = localStorage.getItem(COOKIE_KEY) === 'true'
        state.hasAcceptedCookie = accepted
        state.isOpen = !accepted
      }
    },
    acceptCookie: (state) => {
      state.hasAcceptedCookie = true
      state.isOpen = false
      if (typeof window !== 'undefined') {
        localStorage.setItem(COOKIE_KEY, 'true')
      }
    },
    closeCookieBanner: (state) => {
      state.isOpen = false
    },
  },
})

export const { initializeCookieBanner, acceptCookie, closeCookieBanner } =
  cookieBannerSlice.actions
