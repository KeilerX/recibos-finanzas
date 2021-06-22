import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import SignedInForm from '../../shared/SignedInForm'

const CostsReceiptSchema = yup.object({
  reason: yup.string().ensure(),
  cost_type: yup.string().ensure(),
  cost: yup.number('Debe ingresar un número').moreThan(0, 'El número debe ser mayor a cero'),
});

const CostsReceipt = () => {
  const { auth } = useSelector((state) => state.firebase);

  const initialValues= {
    reason: '',
    cost_type: '',
    cost: '',
  };

  const fields = [
      {
        label: 'Motivo',
        name: 'reason',
        type: 'select',
        selectOptions: [
          { value: 'Portes', label: 'Portes' },
          { value: 'Gastos', label: 'Gastos' },
        ],
        endAdornment: true,
      },
      {
        slabel: 'Formato',
        sname: 'cost_type',
        type: 'select-input',
        selectOptions: [
          { value: 'moneda', label: 'Efectivo' },
          { value: 'porcentaje', label: 'Porcentaje' },
        ],
        label: 'Costo',
        name: 'cost',
        endAdornment: true,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
        <SignedInForm
            initialValues={initialValues}
            validationSchema={CostsReceiptSchema}
            cardTitle={'Costos/Gastos del Recibo por Honorarios'}
            fields={fields}
            btnText={'Continuar'}
            actionToDispatch={'setCostsReceipt'}
        />
    </div>
  )
}

export default CostsReceipt
