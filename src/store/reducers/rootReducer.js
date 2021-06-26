import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import currencyReducer from './currencyReducer';
import receiptReducer from './receiptReducer';
import modalReducer from './modalReducer';
import walletReducer from './walletReducer';
import dbSaveReducer from './dbSaveReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  currencies: currencyReducer,
  receipts: receiptReducer,
  wallets: walletReducer,
  modals: modalReducer,
  dbSaves: dbSaveReducer,
});

export default rootReducer;