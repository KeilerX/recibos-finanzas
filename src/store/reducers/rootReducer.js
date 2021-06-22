import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import currencyReducer from './currencyReducer';
import receiptReducer from './receiptReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  currencies: currencyReducer,
  receipts: receiptReducer,
});

export default rootReducer;