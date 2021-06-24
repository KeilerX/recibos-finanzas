import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect, useHistory } from 'react-router-dom';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import Button from '@material-ui/core/Button';


const Currency = () => {
  const history = useHistory();
  const { auth } = useSelector((state) => state.firebase);
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

  return (
    <div>
      { !profile.isEmpty ?
        <div>
          <Button variant="contained" color="secondary" onClick={e => history.push('/create-currency')}>
            Agregar Moneda
          </Button>
          <h2>Mis monedas</h2>
          {currencies ? myCurrencies.map((c, key) => {
            return (
              <div key={key}>
                {c.symbol + ' ' + c.name}
              </div>
            )
          }) : <p>No cuenta con ninguna moneda registrada</p>}
        </div>
        : <LoadingScreen />}
    </div >
  )
}

export default Currency

