const initState = {};
const dbSaveReducer = (state = initState, action) => {
    switch(action.type) {
        case '':
            return {
                ...state
            }
        case 'CURRENCY_CREATION_ERROR':
            return {
                ...state
            }
        default:
            return state
    }
}

export default dbSaveReducer