import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  burgerMenu: boolean
}

const initialState: ModalState = {
  burgerMenu: false,
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openBurgerMenu: (state) => {
      state.burgerMenu = true
    },
    closeBurgerMenu: (state) => {
      state.burgerMenu = false
    },
  },
})

export const { openBurgerMenu, closeBurgerMenu } = modalsSlice.actions
export default modalsSlice.reducer
