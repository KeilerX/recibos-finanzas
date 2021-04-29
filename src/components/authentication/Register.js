import { React, useState } from 'react'
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
import { register } from '../../store/actions/authActions';

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

const RegisterSchema = yup.object({
  firstName: yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Se requiere que ingrese su(s) nombre(s)'),
  lastName: yup.string().min(2, 'El apellido debe tener al menos 2 caracteres').required('Se requiere que ingrese su(s) apellido(s)'),
  email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
  password: yup
    .string().min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required("Por favor ingrese su contraseña"),
});

const Register = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: values => {
      console.log(values);
      const newUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      };
      dispatch(register(newUser));
      history.push('/login');
    }
  });

  const { auth } = useSelector((state) => state.firebase);

  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title="Registro de nuevo usuario"
          className={classes.titleCard}
        ></CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Nombres"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Apellidos"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="Correo Electrónico"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Contraseña"
              fullWidth
              autoComplete="off"
              className={classes.textField}
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained" color="primary">Registrarse</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
