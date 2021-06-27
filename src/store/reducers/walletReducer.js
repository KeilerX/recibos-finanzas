import { createSlice } from '@reduxjs/toolkit'
import * as functions from '../../utils/functions'

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
            console.log("l", state.infoWallet.length)
            if(state.infoWallet.length > 0) {
                const results = {
                    discount_date: state.rateTermWallet.discount_date,
                    nominal_value: state.infoWallet[state.infoWallet.length - 1].nominal_value,
                    /* ND: '',
                    TE: '',
                    d: '',
                    D: '',
                    Rt: '',
                    CI: '',
                    VNet: '',
                    VR: '',
                    CF: '',
                    VE: '',
                    TCEA: '' */
                }
                console.log(results)
                state.results = [...state.results, results]

            }
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