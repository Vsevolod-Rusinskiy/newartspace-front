import { createSlice } from '@reduxjs/toolkit'

interface AgeVerificationState {
  isAgeVerified: boolean
  isInitialized: boolean
}

const initialState: AgeVerificationState = {
  isAgeVerified: false,
  isInitialized: false,
}

const AGE_VERIFICATION_KEY = 'ageVerified'

export const ageVerificationSlice = createSlice({
  name: 'ageVerification',
  initialState,
  reducers: {
    initializeAgeVerification: (state) => {
      if (!state.isInitialized && typeof window !== 'undefined') {
        const verified = localStorage.getItem(AGE_VERIFICATION_KEY) === 'true'
        state.isAgeVerified = verified
        state.isInitialized = true
      }
    },
    confirmAge: (state) => {
      state.isAgeVerified = true
      if (typeof window !== 'undefined') {
        localStorage.setItem(AGE_VERIFICATION_KEY, 'true')
      }
    },
    resetAgeVerification: (state) => {
      state.isAgeVerified = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AGE_VERIFICATION_KEY)
      }
    },
  },
})

export const { initializeAgeVerification, confirmAge, resetAgeVerification } =
  ageVerificationSlice.actions

export default ageVerificationSlice.reducer
