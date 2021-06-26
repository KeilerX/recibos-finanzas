import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Redirect, useHistory } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setReceiptStatus } from '../../store/reducers/receiptReducer';
 
const useStyles = makeStyles((theme) => ({
    select: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexWrap: "wrap",
      color: "black",
      backgroundColor: "#eee"
    },
    button: {
        marginTop: "10px",
    },
}));

const CheckRateType = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.firebase);
  const [ currency, setCurrency ] = useState(null);

  const { profile } = useSelector((state) => state.firebase);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  const rateType = [
    { value: 'Tasa Efectiva', label: 'Tasa Efectiva' },
    { value: 'Tasa Nominal', label: 'Tasa Nominal' },
  ];

  const selectRateType = e => {
    setCurrency(e.target.value);
    localStorage.setItem("rate_type", e.target.value);
  }

  const to = e => {
    dispatch(setReceiptStatus('info'));
    history.push("/receipt");
  }

  return (
    <div>
      { !profile.isEmpty ?
            <div>
                <h3>Selecciona el tipo de tasa con el que se trabajará</h3>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.select}
                value={localStorage.getItem("rate_type")}
                onChange={(e) => selectRateType(e)}
                >
                {rateType.map(c => {
                return (
                    <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                )
                })}
                </Select>
                {(localStorage.getItem("rate_type") !== null) ? 
                <Button variant="contained" color="secondary" onClick={e => to(e)} className={classes.button}>
                    Continuar
                </Button> : null
                }
            </div>
        : <LoadingScreen />}
    </div >
  )
}

export default CheckRateType
