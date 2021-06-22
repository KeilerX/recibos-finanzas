const initState = {
  currencyError: null,
  currencies: {}
}
const currencyReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CURRENCY_CREATED':
      return {
        ...state,
        currencyError: null
      }
    case 'CURRENCY_CREATION_ERROR':
      return {
        ...state,
        currencyError: action.err.message,
      }
    case 'GET_CURRENCIES':
      return {
        ...state,
        currencyError: null,
        currencies: action.data,
      }
    case 'GET_CURRENCIES_ERROR':
      return {
        ...state,
        currencyError: action.err.message,
        currencies: {},
      }
    default: return state;
  }
}


export default currencyReducer;