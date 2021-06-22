import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import { useFormik } from 'formik';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../layout/loading_screen/LoadingScreen';
import { setReceiptStatus, setInfoReceipt, setCostsReceipts } from '../store/reducers/receiptReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 700,
    marginLeft: 50,
    marginRight: 50,
    opacity: 0.85,
  },
  textField: {
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  titleCard: {
    marginTop: '10px',
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
  }
}));

const SignedInForm = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.firebase);
  const { profile } = useSelector((state) => state.firebase);

  const { costsReceipt } = useSelector((state) => state.receipts);

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: props.validationSchema,
    onSubmit: values => {
      console.log("values", values)
      console.log("dispatch", props.actionToDispatch)
      switch(props.actionToDispatch) {
        case 'setInfoReceipt': {
          dispatch(setInfoReceipt(values))
          dispatch(setReceiptStatus('costs'))
          break
        }
        case 'setCostsReceipt': {
          dispatch(setCostsReceipts(values))
          break
        }
        default:
          break
      }
      //dispatch(setInfoReceipt(infoReceipt))
      //dispatch(login(credentials));
      //history.push('/');
    }
  });

  const handleCostReasonChange = (event) => {
    formik.setFieldValue('reason', event.target.value);
  }

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      { !profile.isEmpty ?
      <div>
        <Card className={classes.root} variant="outlined">
            <CardHeader title={props.cardTitle} className={classes.titleCard}></CardHeader>
            <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={0}>
                {props.fields.map(f => {
                  return (
                    f.type === 'select' ?
                    <TextField
                    key={f.name}
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
                          <HelpIcon />
                        </InputAdornment>
                      ) : null }}>
                    {f.selectOptions.map((o) => {
                      return (
                        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                      )
                    })}
                    </TextField> :
                    f.type === 'select-input' ?
                    <Grid item xs={12}>
                      <TextField
                      key={f.sname}
                      label={f.slabel}
                      fullWidth
                      autoComplete="off"
                      className={classes.textField}
                      name={f.sname}
                      select
                      onChange={formik.handleChange}
                      /* onChange={e => formik.setFieldValue(f.name, e.target.value)} */
                      value={formik.values[f.sname]}>
                      {f.selectOptions.map((o) => {
                        return (
                          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                        )
                      })}
                      </TextField>
                      <TextField
                      key={f.name}
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
                      InputLabelProps={(f.type === 'date') ? {
                        shrink: true
                      } : null }
                      InputProps={{
                        endAdornment: f.endAdornment ? (
                          <InputAdornment position="end" className={classes.helpIcon}>
                            <HelpIcon />
                          </InputAdornment>
                        ) : null }}
                    />
                    {
                      costsReceipt && (
                        <List>
                          <ListItem>
                            {/* <ListItemAvatar>
                              <Avatar>
                                <FolderIcon />
                              </Avatar>
                            </ListItemAvatar> */}
                            {costsReceipt.map(c => {
                              return (
                                <ListItem key={c.reason}>
                                  <ListItemText
                                    primary={`${c.reason} ${c.cost_type === 'moneda' ? localStorage.getItem('currency') : '%'}${c.cost}`}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end">
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              )
                            })}
                            
                          </ListItem>
                        </List>
                      )
                    }
                    </Grid>
                    :
                    <TextField
                    key={f.name}
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
                    InputLabelProps={(f.type === 'date') ? {
                      shrink: true
                    } : null }
                    InputProps={{
                      endAdornment: f.endAdornment ? (
                        <InputAdornment position="end" className={classes.helpIcon}>
                          <HelpIcon />
                        </InputAdornment>
                      ) : null }}
                    />
                    ) /* end return */
                    })} {/* /* end map fields */}
                <Button type="submit" variant="contained" color="primary">{props.btnText}</Button>
              </Grid>
            </form>
            </CardContent>
        </Card>
      </div>
    : <LoadingScreen />}
    </div>
  )
}

export default SignedInForm
