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
  root: {
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: 'white',
    color: 'black',
    padding: '20px 20px 20px 20px',
    borderRadius: 5,
    opacity: 0.90,
  },
  title: {
    color: '#3f51b5',
    textAlign: 'center',
    fontSize: '30px',
  },
  text: {
    fontSize: '25px',
  },
  select: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    marginTop: '20px',
  },
}))

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
    dispatch(setReceiptStatus('rate_type'));
    history.push("/receipt");
  }

  return (
    <div>
      {!profile.isEmpty ?
        <div>
          {currencies ? 
            <div className={classes.root}>
                <div className={classes.title}>Selecciona la moneda con la que se trabajará</div>
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
            <div className={classes.root}>
                <div className={classes.title}>Aviso</div>
                <div className={classes.text}>No cuenta con ninguna moneda registrada</div>
                <div className={classes.text}>Para poder continuar debe registrar una moneda.</div>
                <Button variant="contained" color="secondary" onClick={e => history.push('/create-currency')} className={classes.button}>
                    Agregar Moneda
                </Button>
            </div>}
        </div>
        : <LoadingScreen />}
    </div >
  )
}

export default CheckCurrency
