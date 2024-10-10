import { createSlice } from '@reduxjs/toolkit'

interface SideBarVisibilityState {
  isClosed: boolean
}

const initialState: SideBarVisibilityState = {
  isClosed: false,
}

export const sideBarVisibilitySlice = createSlice({
  name: 'sideBarVisibility',
  initialState,
  reducers: {
    actionToggleSideBar(state) {
      state.isClosed = !state.isClosed
    },
    actionOpenSideBar(state) {
      state.isClosed = false
    },
    actionCloseSideBar(state) {
      state.isClosed = true
    },
  },
})

export const { actionToggleSideBar, actionOpenSideBar, actionCloseSideBar } =
  sideBarVisibilitySlice.actions
