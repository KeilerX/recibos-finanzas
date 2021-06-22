import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Redirect, useHistory } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '../../shared/Modal';

const Currency = () => {
  const [open, setOpen] = useState(false); //needed to open modal
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

  const handleClickOpen = () => { //needed to open modal
    setOpen(true);
  };

  const handleClose = () => { //needed to open modal
    setOpen(false);
  };

  return (
    <div>
      { !profile.isEmpty ?
        <div>
          <Button variant="contained" color="secondary" onClick={e => history.push('/create-currency')}>
            Agregar Moneda
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
            Abrir modal
          </Button>
          <Modal
            buttonText={"Hola"}
            modalTitle={"Hola"} 
            modalMessage={"Hola"} 
            actionButtonText={"Hola 2"}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
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
