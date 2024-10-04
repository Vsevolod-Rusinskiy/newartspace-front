import { createSlice } from '@reduxjs/toolkit'

export interface BurgerMenuModalState {
  burgerMenu: boolean
}

const initialState: BurgerMenuModalState = {
  burgerMenu: false,
}

export const burgerMenuModalSlice = createSlice({
  name: 'burgerMenuModal',
  initialState,
  reducers: {
    actionOpenBurgerMenu: (state) => {
      state.burgerMenu = true
    },
    actionCloseBurgerMenu: (state) => {
      state.burgerMenu = false
    },
  },
})

export const { actionOpenBurgerMenu, actionCloseBurgerMenu } =
  burgerMenuModalSlice.actions
export default burgerMenuModalSlice.reducer
