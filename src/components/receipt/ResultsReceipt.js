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
  
  const [paymentDate, setPaymentDate] = useState(infoReceipt.payment_date);
  const [discountDate, setDiscountDate] = useState(rateTermReceipt.discount_date);
  const [NDias, setNDias] = useState(functions.calcularDiasTranscurridos(discountDate, paymentDate));
   
  const [tasaNDias, setTasaNDias] = useState(functions.calcularTasaEfectivaANDias(rateTermReceipt.rate_term,NDias,rateTermReceipt.rate_value,rateTermReceipt.capitalization_term));
  const [tasaDcto, setTasaDcto] = useState(functions.calcularTasaEfectivaDescuentoANDias(tasaNDias));

  const [nominalValue, setNominalValue] = useState(infoReceipt.nominal_value);
  const [dct, setDct] = useState(functions.calcularDescuentoANDias(tasaDcto,nominalValue));
  const [valorNeto, setValorNeto] = useState(functions.calcularValorNeto(nominalValue,dct));
  
  const [retention, setRetention] = useState(infoReceipt.retention);

  const [sumInitialCosts, setSumInitialCosts]=useState(functions.calcularSumaCostos(initialCostsReceipt, nominalValue));
  const [sumFinalCosts, setSumFinalCosts]=useState(functions.calcularSumaCostos(finalCostsReceipt, nominalValue));

  const [valorRecibido, setValorRecibido] = useState(functions.calcularValorRecibido(valorNeto,sumInitialCosts,retention));
  const [valorEntregado, setValorEntregado] = useState(functions.calcularValorEntregado(nominalValue,sumFinalCosts,retention));

  const [TCEA, setTCEA] = useState(functions.calcularTCEA(valorEntregado,valorRecibido,NDias,rateTermReceipt.year_days));

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
            <div>Fecha de pago {paymentDate}</div>
            <div>Fecha de descuento {discountDate}</div>
            <div># dias {NDias}</div>
            <div>TE% {tasaNDias.toFixed(7)}</div>
            <div>d% {tasaDcto.toFixed(7)}</div>
            <div>Valor nominal {nominalValue}</div>
            <div>Descuento {dct.toFixed(2)}</div>
            <div>Valor neto {valorNeto.toFixed(2)}</div>
            <div>Retencion {retention}</div>
            <div>Suma costos iniciales {sumInitialCosts}</div>
            <div>Suma costos finales {sumFinalCosts}</div>
            <div>Valor recibido {valorRecibido.toFixed(2)}</div>
            <div>Valor entregado {valorEntregado.toFixed(2)}</div>
            <div>TCEA% {TCEA.toFixed(7)}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsReceipt
