import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../shared/SignedInForm'

const InfoReceiptSchema = yup.object({
  emission_date: yup.date('Ingrese una fecha válida').required('La fecha de emisión es requerida'),
  payment_date: yup.date('Ingrese una fecha válida').required('La fecha de pago es requerida'),
  tr: yup.number('Debe ingresar un número').required('El monto recibido es requerido').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
  retention: yup.number('Debe ingresar un número').required('La retención es requerida').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
});

const InfoReceipt = () => {
  const { auth } = useSelector((state) => state.firebase);

  const initialValues= {
    emission_date: '',
    payment_date: '',
    tr: '',
    retention: '',
  };

  const fields = [
      {
        label: 'Fecha de Emisión',
        name: 'emission_date',
        type: 'date',
        endAdornment: true,
      },
      {
        label: 'Fecha de Pago',
        name: 'payment_date',
        type: 'date',
        endAdornment: true,
      },
      {
        label: 'Total a Recibir',
        name: 'tr',
        type: 'number',
        endAdornment: true,
      },
      {
        label: 'Retención',
        name: 'retention',
        type: 'number',
        endAdornment: true,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
        <Form
            initialValues={initialValues}
            validationSchema={InfoReceiptSchema}
            cardTitle={'Datos del Recibo por Honorarios'}
            fields={fields}
            btnText={'Continuar'}
            actionToDispatch={'setInfoReceipt'}
        />
    </div>
  )
}

export default InfoReceipt
