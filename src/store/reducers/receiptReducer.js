import { createSlice } from '@reduxjs/toolkit'

export const receiptSlice = createSlice({
    name: 'receipt',
    initialState: {
        receiptStatus: null,
        infoReceipt: {
            emission_date: null,
            payment_date: null,
            tr: null,
            retention: null,
        },
        costsReceipt: []
    },
    reducers: {
        setReceiptStatus: (state, action) =>{
            state.receiptStatus = action.payload
        },
        setInfoReceipt: (state, action) => {
            state.infoReceipt = action.payload
        },
        setCostsReceipts: (state, action) => {
            /* state.costsReceipt = action.payload */
            state.costsReceipt = [...state.costsReceipt, action.payload]
        },
    },
});

export const { setReceiptStatus, setInfoReceipt, setCostsReceipts } = receiptSlice.actions

export default receiptSlice.reducer