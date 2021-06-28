import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import HelpIcon from '@material-ui/icons/Help'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'

import { useFormik } from 'formik'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import LoadingScreen from '../layout/loading_screen/LoadingScreen'
import { 
  setReceiptStatus, 
  setInfoReceipt, 
  setInitialCostsReceipts, 
  removeInitialCostsReceipt, 
  setMessageInitialCostsReceipt,
  setFinalCostsReceipts,
  setMessageFinalCostsReceipt,
  removeFinalCostsReceipt,
  setRateTermReceipt,
} from '../store/reducers/receiptReducer'
import {
  setInitialCostsWallet, 
  setFinalCostsWallet,
  setRateTermWallet,
  setWalletResults,
  setInfoWallet,
  setGeneralResults
} from '../store/reducers/walletReducer'
import { 
  setModalInfo, 
} from '../store/reducers/modalReducer'
import Modal from '../shared/Modal'
import * as Constants from '../static/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 700,
    marginLeft: 50,
    marginRight: 50,
    opacity: 0.90,
  },
  subRoot: {
    width: '40%',
    margin: 'auto',
    overflowX: 'hidden',
    marginTop: 80,
    opacity: 0.90,
  },
  textField: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleCard: {
    marginTop: 10,
    color: '#3f51b5',
    textAlign: 'center'
  },
  helpIcon: {
    fontSize: 30,
    backgroundColor: 'white',
    color: 'black',
    padding: 0,
    cursor: 'pointer',
  },
  helpIconSelect: {
    fontSize: 30,
    backgroundColor: 'white',
    color: 'black',
    padding: 0,
    cursor: 'pointer',
    marginRight: theme.spacing(3),
  },
  label: {
    textAlign: 'left',
  },
  listItem: {
    textAlign: 'center',
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    width: '50%',
    margin: 'auto',
    marginTop: 20,
  }
}));

const Form = (props) => {
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const { auth } = useSelector((state) => state.firebase)
  const { profile } = useSelector((state) => state.firebase)

  const { infoReceipt,
          initialCostsReceipt,
          messageInitialCostsReceipt,
          finalCostsReceipt,
          messageFinalCostsReceipt,
          receiptStatus } = useSelector((state) => state.receipts)
  const { info } = useSelector((state) => state.modals)

  if(messageInitialCostsReceipt !== null || messageFinalCostsReceipt !== null) {
    setTimeout(() => {
      dispatch(setMessageInitialCostsReceipt(null))
      dispatch(setMessageFinalCostsReceipt(null))
    }, 3000)
  }

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: props.validationSchema,
    onSubmit: values => {
      console.log("values", values)
      console.log("dispatch", props.actionToDispatch)
      switch(props.actionToDispatch) {
        case 'setInfoReceipt': {
          dispatch(setInfoReceipt(values))
          dispatch(setReceiptStatus('initial_costs'))
          break
        }
        case 'setInitialCostsReceipt': {
          dispatch(setReceiptStatus('final_costs'))
          break
        }
        case 'setFinalCostsReceipt': {
          dispatch(setReceiptStatus('rate_term'))
          break
        }
        case 'setNominalRateTermReceipt': {
          const operationType = localStorage.getItem('operation_type')
          if(operationType === 'receipt') {
            dispatch(setRateTermReceipt(values))
          } else {
            dispatch(setInitialCostsWallet(initialCostsReceipt))
            dispatch(setFinalCostsWallet(finalCostsReceipt))
            dispatch(setRateTermWallet(values))
            dispatch(setInfoWallet(infoReceipt))
            dispatch(setGeneralResults(infoReceipt))
          }
          dispatch(setReceiptStatus('results'))
          break
        }
        case 'addInfoWallet': {
          dispatch(setInfoWallet(values))
          dispatch(setGeneralResults(values))
          break
        }
        default:
          break
      }
    }
  });

  const [open, setOpen] = useState(false) //needed to open modal

  const handleClickOpen = (t, m) => { //needed to open modal
    dispatch(setModalInfo({title: t, message: m}))
    setOpen(true)
  };

  const handleClose = () => { //needed to open modal
    dispatch(setModalInfo({title: null, message: null}))
    setOpen(false)
  };

  const addItem = () => {
    switch(props.actionToDispatch) {
      case 'setInitialCostsReceipt': {
        if(formik.values.cost && formik.values.reason && formik.values.cost_type) {
          dispatch(setInitialCostsReceipts(formik.values))
        } else {
          dispatch(setMessageInitialCostsReceipt('Por favor, complete los valores de manera correcta.'))
        }
        break
      }
      case 'setFinalCostsReceipt': {
        if(formik.values.cost && formik.values.reason && formik.values.cost_type) {
          dispatch(setFinalCostsReceipts(formik.values))
        } else {
          dispatch(setMessageFinalCostsReceipt('Por favor, complete los valores de manera correcta.'))
        }
        break
      }
      default:
        break
    }
  }

  const removeItem = (c, key) => {
    switch(props.actionToDispatch) {
      case 'setInitialCostsReceipt': {
        dispatch(removeInitialCostsReceipt({c, key}))
        break
      }
      case 'setFinalCostsReceipt': {
        dispatch(removeFinalCostsReceipt({c, key}))
        break
      }
      default:
        break
    }
  }


  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      { !profile.isEmpty ?
      <div>
        <Card className={props.style ? classes[props.style] : classes.root} variant="outlined">
            <CardHeader title={props.cardTitle} className={classes.titleCard}></CardHeader>
            <CardContent>
            <Grid item xs={12}>
              { info &&
              <Modal
                modalTitle={info.title}
                modalMessage={info.message}
                open={open}
                actionButtonText={"Ok"}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
              />
              }
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={0}>
                {props.fields.map(f => {
                  return (
                    f.type === 'select' ? //select
                    <Grid item xs={12} key={f.name}>
                      <TextField
                      label={f.label}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.name}
                      select
                      onChange={formik.handleChange}
                      /* onChange={e => formik.setFieldValue(f.name, e.target.value)} */
                      value={formik.values[f.name]}
                      InputProps={{
                        endAdornment: f.endAdornment ? (
                          <InputAdornment position="end" className={classes.helpIconSelect}>
                            <HelpIcon onClick={() => handleClickOpen(f.modalTitle, f.modalMessage)}/>
                          </InputAdornment>
                        ) : null }}>
                      {f.selectOptions.map((o) => {
                        return (
                          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                        )
                      })}
                      </TextField>
                    </Grid> :
                    f.type === 'costs' ? //costs
                    <Grid item xs={12} key={f.sname}>
                      <TextField
                      label={f.slabel}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.sname}
                      select
                      onChange={formik.handleChange}
                      /* onChange={e => formik.setFieldValue(f.name, e.target.value)} */
                      value={formik.values[f.sname]}>
                      {f.selectOptions.map((o, key) => {
                        return (
                          <MenuItem key={key} value={o.value}>{o.label}</MenuItem>
                        )
                      })}
                      </TextField>
                      <TextField
                      label={f.label}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.name}
                      type={f.itype}
                      onChange={formik.handleChange}
                      value={formik.values[f.name]}
                      error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
                      helperText={formik.touched[f.name] && formik.errors[f.name]}
                      InputLabelProps={(f.itype === 'date') ? {
                        shrink: true
                      } : null }
                      InputProps={{
                        endAdornment: f.endAdornment ? (
                          <InputAdornment position="end" className={classes.helpIcon}>
                            <HelpIcon onClick={() => handleClickOpen(f.modalTitle, f.modalMessage)}/>
                          </InputAdornment>
                        ) : null }}
                    />
                    {
                      initialCostsReceipt && receiptStatus === 'initial_costs' && (
                        <List>
                            {initialCostsReceipt.map((c,key) => {
                              return (
                                <ListItem key={key} className={classes.listItem}>
                                  <ListItemText
                                    primary={`${c.reason} ${c.cost_type === 'moneda' ? localStorage.getItem('currency') : '%'}${c.cost}`}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => removeItem(c, key)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              )
                            })}
                        </List>
                      )
                    }
                                        {
                      finalCostsReceipt && receiptStatus === 'final_costs' && (
                        <List>
                            {finalCostsReceipt.map((c,key) => {
                              return (
                                <ListItem key={key} className={classes.listItem}>
                                  <ListItemText
                                    primary={`${c.reason} ${c.cost_type === 'moneda' ? localStorage.getItem('currency') : '%'}${c.cost}`}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => removeItem(c, key)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              )
                            })}
                        </List>
                      )
                    }
                    <Button variant="contained" color="primary" onClick={() => addItem()} >{f.btnText}</Button>
                    { messageInitialCostsReceipt && <div className={classes.message}>{messageInitialCostsReceipt}</div>}
                    { messageFinalCostsReceipt && <div className={classes.message}>{messageFinalCostsReceipt}</div>}
                    </Grid>
                    :
                    f.type === 'select-auto-input' ? //select-auto-input
                    <Grid container spacing={2} key={f.sname}>
                    <Grid item xs={6} >
                      <TextField
                      label={f.slabel}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.sname}
                      select
                      /* onChange={formik.handleChange} */
                      /* onChange={e => handleCustomChange(f.sname, f.name, e)} */
                      onChange={e => {
                        formik.setFieldValue(f.name, e.target.value)
                        formik.setFieldValue(f.sname, e.target.value)
                      }}
                      value={formik.values[f.sname]}
                      error={formik.touched[f.sname] && Boolean(formik.errors[f.sname])}
                      helperText={formik.touched[f.sname] && formik.errors[f.sname]}>
                      {f.selectOptions.map((o, key) => {
                        return (
                          <MenuItem key={key} value={o.value}>{o.label}</MenuItem>
                        )
                      })}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                      label={f.label}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.name}
                      type={f.itype}
                      /* onChange={formik.handleChange} */
                      /* onChange={() => formik.setFieldValue(f.name, f.sname)} */
                      /* value={formik.values[f.name]} */
                      value={formik.values[f.sname]}
                      error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
                      helperText={formik.touched[f.name] && formik.errors[f.name]}
                      inputProps={{ style: {textAlign: 'center'} }}
                      InputProps={{
                        endAdornment: f.endAdornment ? (
                          <InputAdornment position="end" className={classes.helpIcon}>
                            <HelpIcon onClick={() => handleClickOpen(f.modalTitle, f.modalMessage)}/>
                          </InputAdornment>
                        ) : null }}
                      />
                    </Grid>
                    </Grid> :
                    <Grid item xs={12} key={f.name}>
                    <TextField
                    label={f.label}
                    fullWidth
                    autoComplete="off"
                    className={classes.textField}
                    name={f.name}
                    type={f.type}
                    onChange={formik.handleChange}
                    value={formik.values[f.name]}
                    error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
                    helperText={formik.touched[f.name] && formik.errors[f.name]}
                    inputProps={{ style: {textAlign: 'center'} }}
                    InputLabelProps={(f.type === 'date') ? {
                      shrink: true
                    } : null }
                    InputProps={{
                      endAdornment: f.endAdornment ? (
                        <InputAdornment position="end" className={classes.helpIcon}>
                          <HelpIcon onClick={() => handleClickOpen(f.modalTitle, f.modalMessage)}/>
                        </InputAdornment>
                      ) : null }}
                    />
                    </Grid>
                    ) /* end return */
                  })
                  } {/* /* end map fields */}
                <Button type="submit" variant="contained" color="primary" className={classes.button}>{props.btnText}</Button>
              </Grid>
            </form>
            </CardContent>
        </Card>
      </div>
    : <LoadingScreen />}
    </div>
  )
}

export default Form
