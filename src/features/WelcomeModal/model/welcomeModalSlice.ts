import { createSlice } from '@reduxjs/toolkit'

interface WelcomeModalState {
  hasSeenWelcomeModal: boolean
  isOpen: boolean
  isInitialized: boolean
}

const initialState: WelcomeModalState = {
  hasSeenWelcomeModal: false,
  isOpen: false,
  isInitialized: false,
}

export const welcomeModalSlice = createSlice({
  name: 'welcomeModal',
  initialState,
  reducers: {
    initializeState: (state) => {
      if (typeof window !== 'undefined' && !state.isInitialized) {
        const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal')
        state.hasSeenWelcomeModal = hasSeenModal === 'true'
        state.isInitialized = true
        state.isOpen = !hasSeenModal || hasSeenModal === 'false'
      }
    },
    setHasSeenWelcomeModal: (state) => {
      state.hasSeenWelcomeModal = true
      state.isOpen = false
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSeenWelcomeModal', 'true')
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
