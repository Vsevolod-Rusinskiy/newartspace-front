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

export const welcomeModalSlice = createSlice({
  name: 'welcomeModal',
  initialState,
  reducers: {
    initializeState: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined' && !state.isInitialized) {
        const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal')
        const savedHash = localStorage.getItem('welcomeModalHash')
        state.messageHash = savedHash
        state.hasSeenWelcomeModal =
          hasSeenModal === 'true' && savedHash === action.payload
        state.isInitialized = true
        state.isOpen =
          !hasSeenModal ||
          hasSeenModal === 'false' ||
          savedHash !== action.payload
      }
    },
    setHasSeenWelcomeModal: (state, action: PayloadAction<string>) => {
      state.hasSeenWelcomeModal = true
      state.isOpen = false
      state.messageHash = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSeenWelcomeModal', 'true')
        localStorage.setItem('welcomeModalHash', action.payload)
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
