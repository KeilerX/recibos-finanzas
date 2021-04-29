import { React } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        <div>
          Hola, bienvenido(a), {profile.firstName + ' ' + profile.lastName}
        </div>
        : <LoadingScreen />}
    </div>
  )
}

export default Home
