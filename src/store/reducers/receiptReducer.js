import { createSlice } from '@reduxjs/toolkit'

export const receiptSlice = createSlice({
    name: 'receipt',
    initialState: {
        receiptStatus: 'info',
        infoReceipt: {
            emission_date: null,
            payment_date: null,
            nominal_value: null,
            retention: null,
        },
        initialCostsReceipt: [],
        messageInitialCostsReceipt: null,
        finalCostsReceipt: [],
        messageFinalCostsReceipt: null,
        rateTermReceipt: [],
    },
    reducers: {
        setReceiptStatus: (state, action) => {
            state.receiptStatus = action.payload
        },
        setInfoReceipt: (state, action) => {
            state.infoReceipt = action.payload
        },
        setMessageInitialCostsReceipt: (state, action) => {
            state.messageInitialCostsReceipt = action.payload
        },
        setClearReceiptState: (state) => {
            state.initialCostsReceipt = []
            state.finalCostsReceipt = []
        },
        setInitialCostsReceipts: (state, action) => {
            if(state.initialCostsReceipt) {
                if(state.initialCostsReceipt.some(e => e.reason === action.payload.reason)) {
                    state.initialCostsReceipt = [
                        ...state.initialCostsReceipt.map(e => e.reason === action.payload.reason ? 
                            { ...action.payload, cost: action.payload.cost, cost_type: action.payload.cost_type} : e)
                    ]
                    state.messageInitialCostsReceipt = `${action.payload.reason} ya ha sido agregado, se modificará el valor.`
                } else {
                    state.initialCostsReceipt = [...state.initialCostsReceipt, action.payload]
                }
            }
        },
        removeInitialCostsReceipt: (state, action) => {
            state.initialCostsReceipt = [
                ...state.initialCostsReceipt.slice(0, action.payload.key),
                ...state.initialCostsReceipt.slice(action.payload.key + 1)
            ]
        },
        setMessageFinalCostsReceipt: (state, action) => {
            state.messageFinalCostsReceipt = action.payload
        },
        setFinalCostsReceipts: (state, action) => {
            if(state.finalCostsReceipt) {
                if(state.finalCostsReceipt.some(e => e.reason === action.payload.reason)) {
                    state.finalCostsReceipt = [
                        ...state.finalCostsReceipt.map(e => e.reason === action.payload.reason ? 
                            { ...action.payload, cost: action.payload.cost, cost_type: action.payload.cost_type} : e)
                    ]
                    state.messageFinalCostsReceipt = `${action.payload.reason} ya ha sido agregado, se modificará el valor.`
                } else {
                    state.finalCostsReceipt = [...state.finalCostsReceipt, action.payload]
                }
            }
        },
        removeFinalCostsReceipt: (state, action) => {
            state.finalCostsReceipt = [
                ...state.finalCostsReceipt.slice(0, action.payload.key),
                ...state.finalCostsReceipt.slice(action.payload.key + 1)
            ]
        },
        setRateTermReceipt: (state, action) => {
            state.rateTermReceipt = action.payload
        },
    },
});

export const { setReceiptStatus,
               setInfoReceipt, 
               setInitialCostsReceipts, 
               removeInitialCostsReceipt, 
               setMessageInitialCostsReceipt,
               setFinalCostsReceipts,
               setMessageFinalCostsReceipt,
               removeFinalCostsReceipt,
               setRateTermReceipt,
               setClearReceiptState,
            } = receiptSlice.actions

export default receiptSlice.reducer