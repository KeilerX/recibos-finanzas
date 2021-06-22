import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import LoadingScreen from '../../layout/loading_screen/LoadingScreen';

const Home = () => {

  const { auth } = useSelector((state) => state.firebase);
  const { profile } = useSelector((state) => state.firebase);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      { !profile.isEmpty ?
        <div >
          Hola, bienvenido(a), {profile.firstName + ' ' + profile.lastName}
        </div>
        : <LoadingScreen />}

    </div>
  )
}

export default Home
