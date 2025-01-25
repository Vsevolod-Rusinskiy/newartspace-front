import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalVisibilityState {
  isOpened: boolean
  buttonLabel: string
  paintingName?: string
}

const initialState: ModalVisibilityState = {
  isOpened: false,
  buttonLabel: '',
  paintingName: undefined,
}

interface OpenModalPayload {
  buttonLabel: string
  paintingName?: string
}

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState,
  reducers: {
    actionToggleModal(state) {
      state.isOpened = !state.isOpened
    },
    actionOpenModal(state, action: PayloadAction<OpenModalPayload>) {
      state.isOpened = true
      state.buttonLabel = action.payload.buttonLabel
      state.paintingName = action.payload.paintingName
    },
    actionCloseModal(state) {
      state.isOpened = false
      state.paintingName = undefined
    },
  },
})

export const { actionToggleModal, actionOpenModal, actionCloseModal } =
  modalVisibilitySlice.actions
