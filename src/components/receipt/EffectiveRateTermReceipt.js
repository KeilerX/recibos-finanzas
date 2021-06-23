import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../shared/SignedInForm'
import * as Constants from '../../static/constants'

const NominalRateTermReceiptSchema = yup.object({
  year_days: yup.number('Debe ingresar un número').moreThan(0, 'El número debe ser mayor a cero').required('Los días por año son requeridos'),
  rate_term: yup.string().ensure().required('El plazo de la tasa es requerido'),
  rate_days: yup.number('Debe ingresar un número').moreThan(0, 'Los días de la tasa es requerido')/* .required('Los días del plazo de la tasa son requeridos') */,
  rate_value: yup.number('Debe ingresar un número').moreThan(0, 'El número debe ser mayor a cero').required('El valor de la tasa nominal es requerido'),
  discount_date: yup.date('Ingrese una fecha válida').required('La fecha de descuento es requerida'),
});

const EffectiveRateTermReceipt = () => {
  const { auth } = useSelector((state) => state.firebase);

  const initialValues= {
    year_days: '',
    rate_term: '',
    rate_days: '',
    rate_value: '',
    discount_date: '',
  };

  const fields = [
      {
        label: 'Días por año',
        name: 'year_days',
        type: 'select',
        selectOptions: [
          { value: 360, label: '360 días' },
          { value: 365, label: '365 días' },
        ],
        endAdornment: true,
        modalTitle: Constants.NOMINAL_RATE_TERM.year_type.title,
        modalMessage: Constants.NOMINAL_RATE_TERM.year_type.message,
      },
      {
        slabel: 'Plazo de Tasa',
        sname: 'rate_term',
        type: 'select-auto-input',
        selectOptions: [
          { value: 1, label: 'Diario' },
          { value: 15, label: 'Quincenal' },
          { value: 30, label: 'Mensual' },
          { value: 60, label: 'Bimestral' },
          { value: 90, label: 'Trimestral' },
          { value: 120, label: 'Cuatrimestral' },
          { value: 180, label: 'Semestral' },
          { value: 360, label: 'Anual' },
          { value: 0, label: 'Especial' },
        ],
        label: 'Días del Período',
        name: 'rate_days',
        itype: 'number',
        endAdornment: true,
        modalTitle: Constants.NOMINAL_RATE_TERM.rate_term.title,
        modalMessage: Constants.NOMINAL_RATE_TERM.rate_term.message,
      },
      {
        label: 'Tasa Efectiva',
        name: 'rate_value',
        type: 'number',
        endAdornment: true,
        modalTitle: Constants.NOMINAL_RATE_TERM.rate_value.title,
        modalMessage: Constants.NOMINAL_RATE_TERM.rate_value.message,
      },
      {
        label: 'Fecha de Descuento',
        name: 'discount_date',
        type: 'date',
        endAdornment: true,
        modalTitle: Constants.NOMINAL_RATE_TERM.discount_date.title,
        modalMessage: Constants.NOMINAL_RATE_TERM.discount_date.message,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
        <Form
            initialValues={initialValues}
            validationSchema={NominalRateTermReceiptSchema}
            cardTitle={'Tasa y Plazo Efectiva'}
            fields={fields}
            btnText={'Continuar'}
            actionToDispatch={'setNominalRateTermReceipt'}
        />
    </div>
  )
}

export default EffectiveRateTermReceipt
