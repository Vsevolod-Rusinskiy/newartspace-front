import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortType = 'expensive' | 'cheap' | 'new' | null

interface SortState {
  sortType: SortType
}

const initialState: SortState = {
  sortType: null,
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload
    },
  },
})

export const { setSortType } = sortSlice.actions

export default sortSlice.reducer
