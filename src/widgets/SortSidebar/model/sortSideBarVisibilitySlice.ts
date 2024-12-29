import { createSlice } from '@reduxjs/toolkit'

interface SortSideBarVisibilityState {
  isClosed: boolean
}

const initialState: SortSideBarVisibilityState = {
  isClosed: true,
}

const sortSideBarVisibilitySlice = createSlice({
  name: 'sortSideBarVisibility',
  initialState,
  reducers: {
    actionOpenSortSideBar: (state) => {
      state.isClosed = false
    },
    actionCloseSortSideBar: (state) => {
      state.isClosed = true
    },
    actionToggleSortSideBar: (state) => {
      state.isClosed = !state.isClosed
    },
  },
})

export const {
  actionOpenSortSideBar,
  actionCloseSortSideBar,
  actionToggleSortSideBar,
} = sortSideBarVisibilitySlice.actions

export default sortSideBarVisibilitySlice.reducer
