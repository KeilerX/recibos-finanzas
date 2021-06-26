import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        infoWallet: [],
        initialCostsWallet: [],
        finalCostsWallet: [],
        rateTermWallet: [],
        walletResults: {
            VRWallet: null,
            TCEAWallet: null,
        },
        results: [],
    },
    reducers: {
        setWalletResults: (state, action) => {
            state.walletResults = action.payload
        },
        setInitialCostsWallet: (state, action) => {
            state.initialCostsWallet = action.payload
        },
        setFinalCostsWallet: (state, action) => {
            state.finalCostsWallet = action.payload
        },
        setRateTermWallet: (state, action) => {
            state.rateTermWallet = action.payload
        },
        setInfoWallet: (state, action) => {
            state.infoWallet = [...state.infoWallet, action.payload]
        },
        setGeneralResults: (state, action) => {
            state.results = [...state.results, action.payload]
        },
    },
});

export const { setInitialCostsWallet, 
               setFinalCostsWallet,
               setRateTermWallet,
               setWalletResults,
               setInfoWallet,
               setGeneralResults } = walletSlice.actions

export default walletSlice.reducer