import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../shared/SignedInForm'
import * as Constants from '../../static/constants'

const InfoReceiptSchema = yup.object({
  emission_date: yup.date('Ingrese una fecha válida').required('La fecha de emisión es requerida'),
  payment_date: yup.date('Ingrese una fecha válida').required('La fecha de pago es requerida'),
  nominal_value: yup.number('Debe ingresar un número').required('El monto recibido es requerido').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
  retention: yup.number('Debe ingresar un número').required('La retención es requerida').moreThan(0, 'El valor mínimo debe ser mayor a cero'),
});

const InfoReceipt = () => {
  const { auth } = useSelector((state) => state.firebase);

  const initialValues= {
    emission_date: '',
    payment_date: '',
    nominal_value: '',
    retention: '',
  };

  const fields = [
      {
        label: 'Fecha de Emisión',
        name: 'emission_date',
        type: 'date',
        endAdornment: true,
        modalTitle: Constants.INFO.emission_date.title,
        modalMessage: Constants.INFO.emission_date.message,
      },
      {
        label: 'Fecha de Pago',
        name: 'payment_date',
        type: 'date',
        endAdornment: true,
        modalTitle: Constants.INFO.payment_date.title,
        modalMessage: Constants.INFO.payment_date.message,
      },
      {
        label: 'Total a Recibir',
        name: 'nominal_value',
        type: 'number',
        endAdornment: true,
        modalTitle: Constants.INFO.nominal_value.title,
        modalMessage: Constants.INFO.nominal_value.message,
      },
      {
        label: 'Retención',
        name: 'retention',
        type: 'number',
        endAdornment: true,
        modalTitle: Constants.INFO.retention.title,
        modalMessage: Constants.INFO.retention.message,
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
