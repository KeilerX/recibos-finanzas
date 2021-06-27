import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = () => {
  return (
    <div>
      {/* Cargando */}
      <CircularProgress disableShrink />
    </div>
  )
}

export default LoadingScreen;
