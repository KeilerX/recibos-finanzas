import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        info: {
            title: null,
            message: null,
        },
    },
    reducers: {
        setModalInfo: (state, action) => {
            state.info = action.payload
        },
    },
});

export const { setModalInfo, closeModal } = modalSlice.actions

export default modalSlice.reducer