import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Form from '../../shared/SignedInForm'
import TableCustom from '../../shared/TableCustom'
import * as functions from '../../utils/functions'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'hidden'
    }
}))

const InfoReceiptSchema = yup.object({
  emission_date: yup.date('Ingrese una fecha válida').required('La fecha de emisión es requerida'),
  payment_date: yup.date('Ingrese una fecha válida').required('La fecha de pago es requerida'),
  nominal_value: yup.number('Debe ingresar un número').required('El monto recibido es requerido').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
  retention: yup.number('Debe ingresar un número').required('La retención es requerida').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
});

const ProcessResultsWalletTable = () => {
  const classes = useStyles()
  const { auth } = useSelector((state) => state.firebase);

/*   const { infoWallet, initialCostsWallet, finalCostsWallet, rateTermWallet } = useSelector((state) => state.Wallets)
  
  const [paymentDate, setPaymentDate] = useState(infoWallet.payment_date)
  const [discountDate, setDiscountDate] = useState(rateTermWallet.discount_date)
  const [NDias, setNDias] = useState(functions.calcularDiasTranscurridos(discountDate, paymentDate))
   
  const [tasaNDias, setTasaNDias] = useState(functions.calcularTasaEfectivaANDias(rateTermWallet.rate_term,NDias,rateTermWallet.rate_value,rateTermWallet.capitalization_term))
  const [tasaDcto, setTasaDcto] = useState(functions.calcularTasaEfectivaDescuentoANDias(tasaNDias))

  const [nominalValue, setNominalValue] = useState(infoWallet.nominal_value)
  const [dct, setDct] = useState(functions.calcularDescuentoANDias(tasaDcto,nominalValue))
  const [valorNeto, setValorNeto] = useState(functions.calcularValorNeto(nominalValue,dct))
  
  const [retention, setRetention] = useState(infoWallet.retention)

  const [sumInitialCosts, setSumInitialCosts]=useState(functions.calcularSumaCostos(initialCostsWallet, nominalValue))
  const [sumFinalCosts, setSumFinalCosts]=useState(functions.calcularSumaCostos(finalCostsWallet, nominalValue))

  const [valorRecibido, setValorRecibido] = useState(functions.calcularValorRecibido(valorNeto,sumInitialCosts,retention))
  const [valorEntregado, setValorEntregado] = useState(functions.calcularValorEntregado(nominalValue,sumFinalCosts,retention))

  const [TCEA, setTCEA] = useState(functions.calcularTCEA(valorEntregado,valorRecibido,NDias,rateTermWallet.year_days)) */
  const { infoReceipt, initialCostsReceipt, finalCostsReceipt, rateTermReceipt } = useSelector((state) => state.receipts)
  const { results } = useSelector((state) => state.wallets)
  
  const [paymentDate, setPaymentDate] = useState(infoReceipt.payment_date)
  const [discountDate, setDiscountDate] = useState(rateTermReceipt.discount_date)
  const [NDias, setNDias] = useState(functions.calcularDiasTranscurridos(discountDate, paymentDate))
   
  const [tasaNDias, setTasaNDias] = useState(functions.calcularTasaEfectivaANDias(rateTermReceipt.rate_term,NDias,rateTermReceipt.rate_value,rateTermReceipt.capitalization_term))
  const [tasaDcto, setTasaDcto] = useState(functions.calcularTasaEfectivaDescuentoANDias(tasaNDias))

  const [nominalValue, setNominalValue] = useState(infoReceipt.nominal_value)
  const [dct, setDct] = useState(functions.calcularDescuentoANDias(tasaDcto,nominalValue))
  const [valorNeto, setValorNeto] = useState(functions.calcularValorNeto(nominalValue,dct))
  
  const [retention, setRetention] = useState(infoReceipt.retention)

  const [sumInitialCosts, setSumInitialCosts]=useState(functions.calcularSumaCostos(initialCostsReceipt, nominalValue))
  const [sumFinalCosts, setSumFinalCosts]=useState(functions.calcularSumaCostos(finalCostsReceipt, nominalValue))

  const [valorRecibido, setValorRecibido] = useState(functions.calcularValorRecibido(valorNeto,sumInitialCosts,retention))
  const [valorEntregado, setValorEntregado] = useState(functions.calcularValorEntregado(nominalValue,sumFinalCosts,retention))

  const [TCEA, setTCEA] = useState(functions.calcularTCEA(valorEntregado,valorRecibido,NDias,rateTermReceipt.year_days))

  const columns = [
    { id: 'n', label: 'Nª', minWidth: 20, align: 'center' },
    { id: 'discount_date', label: 'Fecha de Emisión', minWidth: 50, align: 'center' },
    { id: 'nominal_value', label: 'Valor Nominal', minWidth: 50, align: 'center' },
/*     { id: 'ND', label: 'Días transcurridos', minWidth: 100, align: 'center' },
    { id: 'TE', label: 'TE Nª días', minWidth: 50, align: 'center' },
    { id: 'd', label: 'Tasa descontada Nª días', minWidth: 50, align: 'center' },
    { id: 'D', label: 'Descuento Nª días', minWidth: 50, align: 'center' },
    { id: 'Rt', label: 'Retención', minWidth: 50, align: 'center' },
    { id: 'CI', label: 'Costes Iniciales', minWidth: 70, align: 'center' },
    { id: 'VNet', label: 'Valor Neto', minWidth: 70, align: 'center' },
    { id: 'VR', label: 'Total a Recibir', minWidth: 70, align: 'center' },
    { id: 'CF', label: 'Costes Finales', minWidth: 70, align: 'center' },
    { id: 'VE', label: 'Total a Entregar', minWidth: 70, align: 'center' },
    { id: 'TCEA', label: 'TCEA', minWidth: 50, align: 'center' }, */
  ];

  const counter = 1
/*   const rows = []
  rows.push({
    n: { id: 'n', value: counter },
    discount_date: { id: 'discount_date', value: discountDate },
    nominal_value: { id: 'nominal_value', value: nominalValue },
    ND: { id: 'ND', value: NDias },
    TE: { id: 'TE', value: tasaNDias.toFixed(7) },
    d: { id: 'd', value: tasaDcto.toFixed(7) },
    D: { id: 'D', value: dct.toFixed(2) },
    Rt: { id: 'Rt', value: retention.toFixed(2) },
    CI: { id: 'CI', value: sumInitialCosts.toFixed(2) },
    VNet: { id: 'VNet', value: valorNeto.toFixed(2) },
    VR: { id: 'VR', value: valorRecibido.toFixed(2) },
    CF: { id: 'CF', value: sumFinalCosts.toFixed(2) },
    VE: { id: 'VE', value: valorEntregado.toFixed(2) },
    TCEA: { id: 'TCEA', value: TCEA.toFixed(7) }
  }) */
  const rows = results.map((e, idx) => {
    return {
      n: { id: 'n', value: (idx + 1)},
      discount_date: { id: 'discount_date', value: e.discount_date },
      nominal_value: { id: 'nominal_value', value: e.nominal_value },
    }
  })

  const initialValues= {
    emission_date: '',
    payment_date: '',
    nominal_value: '',
    retention: '',
  };

  const fields = [
      {
        label: 'Fecha de Emisión',
        name: 'emission_date',
        type: 'date',
        endAdornment: true,
      },
      {
        label: 'Fecha de Pago',
        name: 'payment_date',
        type: 'date',
        endAdornment: true,
      },
      {
        label: 'Total a Recibir',
        name: 'nominal_value',
        type: 'number',
        endAdornment: true,
      },
      {
        label: 'Retención',
        name: 'retention',
        type: 'number',
        endAdornment: true,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div className={classes.root}>
        <Form
            initialValues={initialValues}
            validationSchema={InfoReceiptSchema}
            cardTitle={'Datos del Recibo por Honorarios'}
            fields={fields}
            btnText={'Añadir'}
            actionToDispatch={'addInfoWallet'}
            style='subRoot'
        />
        {
            rows ? <TableCustom 
                    columns={columns}
                    rows={rows}
                    style='subTable'
                    /> : null
        }
        
    </div>
  )
}

export default ProcessResultsWalletTable
