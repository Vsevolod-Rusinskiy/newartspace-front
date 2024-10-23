import { createSlice } from '@reduxjs/toolkit'

interface ModalVisibilityState {
  isClosed: boolean
}

const initialState: ModalVisibilityState = {
  isClosed: true,
}

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState,
  reducers: {
    actionToggleModal(state) {
      state.isClosed = !state.isClosed
    },
    actionOpenModal(state) {
      state.isClosed = false
    },
    actionCloseModal(state) {
      state.isClosed = true
    },
  },
})

export const { actionToggleModal, actionOpenModal, actionCloseModal } =
  modalVisibilitySlice.actions
