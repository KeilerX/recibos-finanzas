import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Redirect, useHistory } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '../../shared/Modal';

import * as functions from '../../utils/functions';


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
  
  /***/
  const {infoReceipt,costsReceipt} = useSelector((state)=>state);

  let discount_date = "2021-05-05", payment_date = "2021-06-06";
  let diff = functions.calcularDiasTranscurridos(discount_date, payment_date);//dias+1
  console.log(`#dias ${diff}`);
  let rate_term = 30;
  let rate_value = 17.49;
  let tasaANDias = functions.calcularTasaEfectivaANDiasDeEfectiva(rate_term,diff,rate_value);
  console.log(`TE% ${tasaANDias.toFixed(7)}`);
  let tasaDcto = functions.calcularTasaEfectivaDescuentoANDias(tasaANDias);
  console.log(`d% ${tasaDcto.toFixed(7)}`);
  let nominal_value = 4548;
  let dcto = functions.calcularDescuentoANDias(tasaDcto,nominal_value);
  console.log(`Descuento ${dcto.toFixed(2)}`);
  let vneto = functions.calcularValorNeto(nominal_value,dcto);
  console.log(`Valor neto ${vneto.toFixed(2)}`);
  let retencion = 550; //ToDo: cuanto y apartir de qué monto
  /***/


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
            modalTitle={"Costos/Gastos de Recibos por Honorarios"} 
            modalMessage={"Los costos y gastos son bla bla bla bla"} 
            actionButtonText={"Ok"}
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
