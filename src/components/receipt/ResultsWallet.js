import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions';
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

const ResultsWallet = () => {
  const classes = useStyles()
  const { auth } = useSelector((state) => state.firebase)

  const { wallets } = useSelector((state) => state.firestore.data)
  const params = useParams()
  
  const columns = [
    { id: 'n', label: 'Nª', minWidth: 20, align: 'center' },
    { id: 'discount_date', label: 'Fecha de Descuento', minWidth: 50, align: 'center' },
    { id: 'nominal_value', label: 'Valor Nominal', minWidth: 50, align: 'center' },     
    { id: 'ND', label: 'Días transcurridos', minWidth: 100, align: 'center' },
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
  ]

  const myWallets = wallets[params.id]
  const currency = myWallets.currency

  const rows = myWallets.results.map((e) => {
    return {
      n: { id: 'n', value: e.n },
      discount_date: { id: 'discount_date', value: e.discount_date },
      nominal_value: { id: 'nominal_value', value: currency + ' ' +  e.nominal_value.toFixed(2).toString() },
      ND: { id: 'ND', value: e.ND },
      TE: { id: 'TE', value: e.TE.toString() + '%'},
      d: { id: 'd', value: e.d.toString() + '%' },
      D: { id: 'D', value: currency + ' ' + e.D.toFixed(2).toString() },
      Rt: { id: 'Rt', value: currency + ' ' + e.Rt.toFixed(2).toString() },
      CI: { id: 'CI', value: currency + ' ' + e.CI.toFixed(2).toString() },
      VNet: { id: 'VNet', value: currency + ' ' + e.VNet.toFixed(2).toString() },
      VR: { id: 'VR', value: currency + ' ' + e.VR.toFixed(2).toString() },
      CF: { id: 'CF', value: currency + ' ' + e.CF.toFixed(2).toString() },
      VE: { id: 'VE', value: currency + ' ' + e.VE.toFixed(2).toString() },
      TCEA: { id: 'TCEA', value: e.TCEA.toString() + '%'}
    }
  })

  if (!auth.uid) {
    return <Redirect to='/login' />
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridRoot}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <div>
              Valor Recibo de la Cartera: {100000}
              TCEA de la Cartera: {1000000}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        {
            rows ? 
            <TableCustom 
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

export default ResultsWallet
