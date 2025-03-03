import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WelcomeModalState {
  hasSeenWelcomeModal: boolean
  isOpen: boolean
  isInitialized: boolean
  messageHash: string | null
}

const initialState: WelcomeModalState = {
  hasSeenWelcomeModal: false,
  isOpen: false,
  isInitialized: false,
  messageHash: null,
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24 часа в миллисекундах

const isStorageExpired = () => {
  const timestamp = localStorage.getItem('welcomeModalTimestamp')
  if (!timestamp) return true

  const savedTime = parseInt(timestamp)
  const currentTime = new Date().getTime()

  return currentTime - savedTime > ONE_DAY_MS
}

export const welcomeModalSlice = createSlice({
  name: 'welcomeModal',
  initialState,
  reducers: {
    initializeState: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined' && !state.isInitialized) {
        if (isStorageExpired()) {
          // Если прошло больше суток, сбрасываем состояние
          localStorage.removeItem('hasSeenWelcomeModal')
          localStorage.removeItem('welcomeModalHash')
          localStorage.removeItem('welcomeModalTimestamp')
          state.hasSeenWelcomeModal = false
          state.messageHash = null
        } else {
          const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal')
          const savedHash = localStorage.getItem('welcomeModalHash')
          state.messageHash = savedHash
          state.hasSeenWelcomeModal =
            hasSeenModal === 'true' && savedHash === action.payload
        }

        state.isInitialized = true
        state.isOpen =
          !state.hasSeenWelcomeModal || state.messageHash !== action.payload
      }
    },
    setHasSeenWelcomeModal: (state, action: PayloadAction<string>) => {
      state.hasSeenWelcomeModal = true
      state.isOpen = false
      state.messageHash = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSeenWelcomeModal', 'true')
        localStorage.setItem('welcomeModalHash', action.payload)
        localStorage.setItem(
          'welcomeModalTimestamp',
          new Date().getTime().toString()
        )
      }
    },
    openWelcomeModal: (state) => {
      if (!state.hasSeenWelcomeModal) {
        state.isOpen = true
      }
    },
    closeWelcomeModal: (state) => {
      state.isOpen = false
    },
  },
})

export const {
  setHasSeenWelcomeModal,
  openWelcomeModal,
  closeWelcomeModal,
  initializeState,
} = welcomeModalSlice.actions
