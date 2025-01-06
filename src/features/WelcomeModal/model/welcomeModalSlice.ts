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

const welcomeModalSlice = createSlice({
  name: 'welcomeModal',
  initialState,
  reducers: {
    initializeState: (state) => {
      if (typeof window !== 'undefined' && !state.isInitialized) {
        const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal')
        console.log('Initializing WelcomeModal state:', { hasSeenModal })
        state.hasSeenWelcomeModal = hasSeenModal === 'true'
        state.isInitialized = true
        state.isOpen = !hasSeenModal || hasSeenModal === 'false'
        console.log('State after initialization:', {
          hasSeenWelcomeModal: state.hasSeenWelcomeModal,
          isOpen: state.isOpen,
          isInitialized: state.isInitialized,
        })
      }
    },
    setHasSeenWelcomeModal: (state) => {
      console.log('Setting hasSeenWelcomeModal to true')
      state.hasSeenWelcomeModal = true
      state.isOpen = false
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSeenWelcomeModal', 'true')
      }
    },
    openWelcomeModal: (state) => {
      console.log('Trying to open modal:', {
        hasSeenWelcomeModal: state.hasSeenWelcomeModal,
      })
      if (!state.hasSeenWelcomeModal) {
        state.isOpen = true
        console.log('Modal opened')
      }
    },
    closeWelcomeModal: (state) => {
      console.log('Closing modal')
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
export const welcomeModalReducer = welcomeModalSlice.reducer
