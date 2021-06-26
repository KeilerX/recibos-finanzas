import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../shared/SignedInForm'
import * as Constants from '../../static/constants'

const FinalCostsReceiptSchema = yup.object({
  reason: yup.string().ensure(),
  cost_type: yup.string().ensure(),
  cost: yup.number('Debe ingresar un número').moreThan(0, 'El número debe ser mayor a cero'),
});

const FinalCostsReceipt = () => {
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
          { value: 'Gastos de administración', label: 'Gastos de administración' },
          { value: 'Otros gastos', label: 'Otros gastos' },
        ],
        endAdornment: true,
        modalTitle: Constants.FINAL_COSTS.reason.title,
        modalMessage: Constants.FINAL_COSTS.reason.message,
      },
      {
        slabel: 'Formato',
        sname: 'cost_type',
        type: 'costs',
        selectOptions: [
          { value: 'moneda', label: 'Efectivo' },
          { value: 'porcentaje', label: 'Porcentaje' },
        ],
        label: 'Costo',
        name: 'cost',
        itype: 'number',
        endAdornment: true,
        btnText: 'Añadir',
        modalTitle: Constants.FINAL_COSTS.cost.title,
        modalMessage: Constants.FINAL_COSTS.cost.message,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
        <Form
            initialValues={initialValues}
            validationSchema={FinalCostsReceiptSchema}
            cardTitle={'Costos/Gastos Finales del Recibo por Honorarios'}
            fields={fields}
            btnText={'Continuar'}
            actionToDispatch={'setFinalCostsReceipt'}
        />
    </div>
  )
}

export default FinalCostsReceipt
