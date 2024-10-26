import { createSlice } from '@reduxjs/toolkit'

interface ModalVisibilityState {
  isOpened: boolean
}

const initialState: ModalVisibilityState = {
  isOpened: false,
}

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState,
  reducers: {
    actionToggleModal(state) {
      state.isOpened = !state.isOpened
    },
    actionOpenModal(state) {
      state.isOpened = true
    },
    actionCloseModal(state) {
      state.isOpened = false
    },
  },
})

export const { actionToggleModal, actionOpenModal, actionCloseModal } =
  modalVisibilitySlice.actions
