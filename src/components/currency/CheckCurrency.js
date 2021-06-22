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

const CheckCurrency = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.firebase);
  const [ currency, setCurrency ] = useState(null);
  useFirestoreConnect(props => [{
    collection: 'currencies',
    where: ['uid', '==', auth.uid]
  }]);
  const { profile } = useSelector((state) => state.firebase);
  const { currencies } = useSelector((state) => state.firestore.data);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  const myCurrencies = [];
  for (const c in currencies) {
    myCurrencies.push({
      symbol: currencies[c].symbol,
      name: currencies[c].name
    });
  }

  const selectCurrency = e => {
    setCurrency(e.target.value);
    localStorage.setItem("currency", e.target.value);
  }

  const to = e => {
    dispatch(setReceiptStatus('info'));
    history.push(localStorage.getItem("to"));
  }

  return (
    <div>
      { !profile.isEmpty ?
        <div>
          {currencies ? 
            <div>
                <h3>Selecciona la moneda con la que se trabajará</h3>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.select}
                value={currency || localStorage.getItem("currency")}
                onChange={(e) => selectCurrency(e)}
                >
                {myCurrencies.map(c => {
                return (
                    <MenuItem key={c.symbol} value={c.symbol}>{c.name}</MenuItem>
                )
                })}
                </Select>
                {(currency !== null || localStorage.getItem("currency") !== null) ? 
                <Button variant="contained" color="secondary" onClick={e => to(e)} className={classes.button}>
                    Continuar
                </Button> : null
                }
            </div> :
            <div>
                <h2>Aviso</h2>
                <p>No cuenta con ninguna moneda registrada</p>
                <p>Para poder continuar debe registrar una moneda.</p>
                <Button variant="contained" color="secondary" onClick={e => history.push('/create-currency')}>
                    Agregar Moneda
                </Button>
            </div>}
        </div>
        : <LoadingScreen />}
    </div >
  )
}

export default CheckCurrency
