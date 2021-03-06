const initState = {
  authError: null,
  uid: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        authError: action.err.message
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'LOGOUT_SUCCESS':
      return state;
    default:
      return state;
  }
}

export default authReducer;