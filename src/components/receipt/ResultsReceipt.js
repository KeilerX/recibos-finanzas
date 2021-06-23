import React, { useState } from 'react'
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
import * as functions from '../../utils/functions'

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

const ResultsReceipt = () => {
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const { auth } = useSelector((state) => state.firebase)
  const { infoReceipt, initialCostsReceipt, finalCostsReceipt, rateTermReceipt } = useSelector((state) => state.receipts)

  const [VN, setVN] = useState(infoReceipt.nominal_value);

  const VN2 = useState(infoReceipt.emission_date);

  if (!auth.uid) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title="Resultados del Descuento de Recibo por Honorarios"
          className={classes.titleCard}
        ></CardHeader>
        <CardContent>
            <div>{VN}</div>
            <div>{VN2}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsReceipt
