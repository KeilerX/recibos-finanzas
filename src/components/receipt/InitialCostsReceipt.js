import React from 'react'
import * as yup from 'yup';

import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../shared/SignedInForm'
import * as Constants from '../../static/constants'

const InitialCostsReceiptSchema = yup.object({
  reason: yup.string().ensure(),
  cost_type: yup.string().ensure(),
  cost: yup.number('Debe ingresar un número').moreThan(0, 'El número debe ser mayor a cero'),
});

const InitialCostsReceipt = () => {
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
          { value: 'Fotocopias', label: 'Fotocopias'},
          { value: 'Comisión de estudio', label: 'Comisión de estudio'},
          { value: 'Comisión de desembolso', label: 'Comisión de desembolso'},
          { value: 'Comisión de intermediación', label: 'Comisión de intermediación'},
          { value: 'Gastos de administración', label: 'Gastos de administración'},
          { value: 'Gastos notariales', label: 'Gastos notariales'},
          { value: 'Gastos registrales', label: 'Gastos registrales'},
          { value: 'Seguro', label: 'Seguro'},
          { value: 'Otros gastos', label: 'Otros gastos'},
        ],
        endAdornment: true,
        modalTitle: Constants.INITIAL_COSTS.reason.title,
        modalMessage: Constants.INITIAL_COSTS.reason.message,
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
        modalTitle: Constants.INITIAL_COSTS.cost.title,
        modalMessage: Constants.INITIAL_COSTS.cost.message,
      }
  ]

  if (!auth.uid) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
        <Form
            initialValues={initialValues}
            validationSchema={InitialCostsReceiptSchema}
            cardTitle={'Costos/Gastos Iniciales del Recibo por Honorarios'}
            fields={fields}
            btnText={'Continuar'}
            actionToDispatch={'setInitialCostsReceipt'}
        />
    </div>
  )
}

export default InitialCostsReceipt
