import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import * as functions from '../../utils/functions'
import Modal from '../../shared/Modal'

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    opacity: 0.90,
  },
  textField: {
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  titleCard: {
    color: '#3f51b5',
    marginTop: '10px',
    textAlign: 'center'
  },
  labelText: {
    fontSize: 18,
  },
  resultText: {
    fontSize: 15,
  },
})

const ResultsReceipt = () => {
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const { auth } = useSelector((state) => state.firebase)
  const { infoReceipt, initialCostsReceipt, finalCostsReceipt, rateTermReceipt } = useSelector((state) => state.receipts)
  
  const [paymentDate, setPaymentDate] = useState(infoReceipt.payment_date)
  const [discountDate, setDiscountDate] = useState(rateTermReceipt.discount_date)
  const [TEA, setTEA] = useState(functions.calcularTEA(rateTermReceipt.year_days, rateTermReceipt.rate_term, rateTermReceipt.rate_value, rateTermReceipt.capitalization_term))
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

  const currency = localStorage.getItem('currency')

  const saveReceipt = () => {
  const  newReceipt = {
      TEA: TEA,
      ND: NDias,
      TE: parseFloat(tasaNDias.toFixed(7)),
      d: parseFloat(tasaDcto.toFixed(7)),
      D: parseFloat(dct.toFixed(2)),
      Rt: parseFloat(retention.toFixed(2)),
      CI: parseFloat(sumInitialCosts.toFixed(2)),
      VNet: parseFloat(valorNeto.toFixed(2)),
      VR: parseFloat(valorRecibido.toFixed(2)),
      CF: parseFloat(sumFinalCosts.toFixed(2)),
      VE: parseFloat(valorEntregado.toFixed(2)),
      TCEA: parseFloat(TCEA.toFixed(7)),
      currency: currency,
      uid: auth.uid,
    }
    localStorage.setItem('dataToSave', JSON.stringify(newReceipt))
    setOpen(true)
    console.log(newReceipt)
  }

  const [open, setOpen] = useState(false) 

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

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
            <List component="nav" className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <ListItem divider>
                    <ListItemText primary="Fecha de Pago" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {paymentDate}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="# dias" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {NDias}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="TEA%" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {TEA.toFixed(7) + ' %'}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="TE%" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {tasaNDias.toFixed(7) + ' %'}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="d%" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {tasaDcto.toFixed(7) + ' %'}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Valor nominal" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + nominalValue.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Descuento" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + dct.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Valor neto" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + valorNeto.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Retencion" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + retention.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Suma costos iniciales" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + sumInitialCosts.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Suma costos finales" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + sumFinalCosts.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Valor recibido" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + valorRecibido.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="Valor entregado" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {currency + ' ' + valorEntregado.toFixed(2)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem divider>
                  <ListItemText primary="TCEA%" className={classes.labelText}/>
                    <ListItemSecondaryAction className={classes.resultText}>
                      {TCEA.toFixed(7) + ' %'}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              </Grid>
            </List>
            <Button variant="contained" color="primary" onClick={saveReceipt}>Guardar</Button>
            <Modal
                modalTitle={"Guardado"}
                modalMessage={"¿Esta seguro que desea guardar este recibo?"}
                open={open}
                actionButtonText={"No"}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                actionButtonTextConfirm={"Sí"}
                dataToSave={localStorage.getItem('dataToSave')}
                actionToSave={'receipt'}
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsReceipt
