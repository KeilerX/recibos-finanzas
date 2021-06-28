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
            const calculatedResults = functions.walletGetRow(state.infoWallet, state.rateTermWallet, state.initialCostsWallet, state.finalCostsWallet)
            if(state.infoWallet.length > 0) {
                const results = {
                    n: calculatedResults.n,
                    discount_date: calculatedResults.discount_date,
                    nominal_value: calculatedResults.nominal_value,
                    ND: parseFloat(calculatedResults.ND),
                    TE: parseFloat(calculatedResults.TE),
                    d: parseFloat(calculatedResults.d),
                    D: parseFloat(calculatedResults.D),
                    Rt: parseFloat(calculatedResults.Rt),
                    CI: parseFloat(calculatedResults.CI),
                    VNet: parseFloat(calculatedResults.VNet),
                    VR: parseFloat(calculatedResults.VR),
                    CF: parseFloat(calculatedResults.CF),
                    VE: parseFloat(calculatedResults.VE),
                    TCEA: parseFloat(calculatedResults.TCEA)
                }
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