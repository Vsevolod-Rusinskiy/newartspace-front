import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ActiveMenuState {
  activeMenu: string
}

const initialState: ActiveMenuState = {
  activeMenu: '/',
}

export const activeMenuSlice = createSlice({
  name: 'activeMenu',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<string>) {
      state.activeMenu = action.payload
    },
  },
})

export const { setActiveMenu } = activeMenuSlice.actions
