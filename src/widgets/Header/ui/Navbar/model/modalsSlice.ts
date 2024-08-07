import { createSlice } from '@reduxjs/toolkit'

export interface IModalState {
  burgerMenu: boolean
}

const initialState: IModalState = {
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
