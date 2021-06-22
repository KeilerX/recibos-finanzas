import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import InfoReceipt from './InfoReceipt';
import CostsReceipt from './CostsReceipt';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  textField: {
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  titleCard: {
    marginTop: '10px',
    textAlign: 'center'
  }
});

const Receipt = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.firebase);

  const { auth } = useSelector((state) => state.firebase);

  const { receiptStatus } = useSelector((state) => state.receipts);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      { !profile.isEmpty ?
      <div>
        {/* {receiptStatus && receiptStatus === 'info' ? <InfoReceipt /> :
        receiptStatus === 'costs' ? <CostsReceipt /> : null
        } */}
        <CostsReceipt />
      </div>
    : <LoadingScreen />}
    </div>
  )
}

export default Receipt
