import React from 'react';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createCurrency } from '../../store/actions/currencyActions';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  textField: {
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  titleCard: {
    marginTop: '10px',
    textAlign: 'center'
  }
});

const CurrencySchema = yup.object({
  name: yup.string().required('El nombre de la moneda es requerido'),
  symbol: yup.string().required('El símbolo de la moneda es requerido'),
});

const CreateCurrency = () => {
  const { auth } = useSelector((state) => state.firebase);
  const { profile } = useSelector((state) => state.firebase);

  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
    },
    validationSchema: CurrencySchema,
    onSubmit: values => {
      console.log(values);
      const newCurrency = {
        name: values.name,
        symbol: values.symbol,
        uid: auth.uid
      };
      dispatch(createCurrency(newCurrency));
      history.push('/currency');
    }
  });

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title="Nueva Moneda"
          className={classes.titleCard}
        ></CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Nombre de Moneda"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="name"
              type="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Símbolo de Moneda"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="symbol"
              type="symbol"
              onChange={formik.handleChange}
              value={formik.values.symbol}
              error={formik.touched.symbol && Boolean(formik.errors.symbol)}
              helperText={formik.touched.symbol && formik.errors.symbol}
            />
            <Button type="submit" variant="contained" color="primary">Crear Moneda</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCurrency
