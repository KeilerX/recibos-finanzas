import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import Form from '../../shared/SignedInForm'
import TableCustom from '../../shared/TableCustom'
import Modal from '../../shared/Modal'
import * as functions from '../../utils/functions'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      overflowX: 'hidden'
    },
    gridRoot: {
      flexGrow: 1,
    },
    card: {
      width: '50%',
      margin: 'auto',
      marginTop: 20,
    },
    button: {
      marginTop: '10px',
    },
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

  const { results } = useSelector((state) => state.wallets)
  
  const columns = [
    { id: 'n', label: 'Nª', minWidth: 20, align: 'center' },
    { id: 'discount_date', label: 'Fecha de Descuento', minWidth: 50, align: 'center' },
    { id: 'nominal_value', label: 'Valor Nominal', minWidth: 50, align: 'center' },     { id: 'ND', label: 'Días transcurridos', minWidth: 100, align: 'center' },
    { id: 'TE', label: 'TE Nª días', minWidth: 50, align: 'center' },
    { id: 'd', label: 'Tasa descontada Nª días', minWidth: 50, align: 'center' },
    { id: 'D', label: 'Descuento Nª días', minWidth: 50, align: 'center' },
    { id: 'Rt', label: 'Retención', minWidth: 50, align: 'center' },
    { id: 'CI', label: 'Costes Iniciales', minWidth: 70, align: 'center' },
    { id: 'VNet', label: 'Valor Neto', minWidth: 70, align: 'center' },
    { id: 'VR', label: 'Total a Recibir', minWidth: 70, align: 'center' },
    { id: 'CF', label: 'Costes Finales', minWidth: 70, align: 'center' },
    { id: 'VE', label: 'Total a Entregar', minWidth: 70, align: 'center' },
    { id: 'TCEA', label: 'TCEA', minWidth: 50, align: 'center' },
  ];

  const rows = results.map((e) => {
    return {
      n: { id: 'n', value: e.n },
      discount_date: { id: 'discount_date', value: e.discount_date },
      nominal_value: { id: 'nominal_value', value: e.nominal_value },
      ND: { id: 'ND', value: e.ND },
      TE: { id: 'TE', value: e.TE.toFixed(7) },
      d: { id: 'd', value: e.d.toFixed(7) },
      D: { id: 'D', value: e.D.toFixed(2) },
      Rt: { id: 'Rt', value: e.Rt.toFixed(2) },
      CI: { id: 'CI', value: e.CI.toFixed(2) },
      VNet: { id: 'VNet', value: e.VNet.toFixed(2) },
      VR: { id: 'VR', value: e.VR.toFixed(2) },
      CF: { id: 'CF', value: e.CF.toFixed(2) },
      VE: { id: 'VE', value: e.VE.toFixed(2) },
      TCEA: { id: 'TCEA', value: e.TCEA.toFixed(7) }
    }
  })

  const currency = localStorage.getItem('currency')

  const saveWallet = () => {
    const newWallet = {
      VRWallet: 20000,
      TCEAWallet: 12.1234567,
      results: results,
      currency: currency,
      uid: auth.uid,
    }
    localStorage.setItem('dataToSave', JSON.stringify(newWallet))
    setOpen(true)
    console.log(newWallet)
  }

  const [open, setOpen] = useState(false) //needed to open modal

  const handleClickOpen = () => { //needed to open modal
    setOpen(true)
  };

  const handleClose = () => { //needed to open modal
    setOpen(false)
  };

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
      <Grid container className={classes.gridRoot}>
        <Grid item xs={12}>
        <Form
              initialValues={initialValues}
              validationSchema={InfoReceiptSchema}
              cardTitle={'Datos del Recibo por Honorarios'}
              fields={fields}
              btnText={'Añadir'}
              actionToDispatch={'addInfoWallet'}
              style='subRoot'
          />
          <Card className={classes.card}>
            <CardContent>
              <div>
              Valor Recibo de la Cartera: {100000}
              TCEA de la Cartera: {1000000}
              </div>
                <Button variant="contained" color="primary" onClick={saveWallet} className={classes.button}>Guardar</Button>
              <Modal
                modalTitle={"Guardado"}
                modalMessage={"¿Esta seguro que desea guardar este cartera?"}
                open={open}
                actionButtonText={"No"}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                actionButtonTextConfirm={"Sí"}
                dataToSave={localStorage.getItem('dataToSave')}
                actionToSave={'wallet'}
            />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        {
            rows ? <TableCustom 
                    columns={columns}
                    rows={rows}
                    style='subTable'
                    /> : null
        }
        </Grid>
      </Grid>
    </div>
  )
}

export default ProcessResultsWalletTable
