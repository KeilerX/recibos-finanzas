const initState = {};
const dbSaveReducer = (state = initState, action) => {
    switch(action.type) {
        case 'RECEIPT_CREATED':
            return {
                ...state
            }
        case 'RECEIPT_CREATION_ERROR':
            return {
                ...state
            }
        case 'WALLET_CREATED':
            return {
                ...state
            }
        case 'WALLET_CREATION_ERROR':
            return {
                ...state
            }
        default:
            return state
    }
}

export default dbSaveReducer