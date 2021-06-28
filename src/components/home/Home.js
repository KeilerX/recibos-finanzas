import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import LoadingScreen from '../../layout/loading_screen/LoadingScreen'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    opacity: 0.90,
    borderRadius: 5,
  },
}))

const Home = () => {
  const classes = useStyles()
  const { auth } = useSelector((state) => state.firebase);
  const { profile } = useSelector((state) => state.firebase);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      { !profile.isEmpty ?
        <div className={classes.root}>
          Hola, bienvenido(a), {profile.firstName + ' ' + profile.lastName}
        </div>
        : <LoadingScreen />}

    </div>
  )
}

export default Home
