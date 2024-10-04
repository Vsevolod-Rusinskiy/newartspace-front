import { createSlice } from '@reduxjs/toolkit'

interface SideBarVisibilityState {
  isOpen: boolean
}

const initialState: SideBarVisibilityState = {
  isOpen: false,
}

export const sideBarVisibilitySlice = createSlice({
  name: 'sideBarVisibility',
  initialState,
  reducers: {
    actionToggleSideBar(state) {
      state.isOpen = !state.isOpen
    },
    actionOpenSideBar(state) {
      state.isOpen = true
    },
    actionCloseSideBar(state) {
      state.isOpen = false
    },
  },
})

export const { actionToggleSideBar, actionOpenSideBar, actionCloseSideBar } =
  sideBarVisibilitySlice.actions
