import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import LoadingScreen from '../../layout/loading_screen/LoadingScreen'
import InfoReceipt from './InfoReceipt'
import InitialCostsReceipt from './InitialCostsReceipt'
import FinalCostsReceipt from './FinalCostsReceipt'
import NominalRateTermReceipt from './NominalRateTermReceipt'
import EffectiveRateTermReceipt from './EffectiveRateTermReceipt'
import CheckRateType  from './CheckRateType'
import ResultsReceipt from './ResultsReceipt'

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

const Receipt = () => {
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.firebase)

  const { auth } = useSelector((state) => state.firebase)

  const { receiptStatus } = useSelector((state) => state.receipts)

  const rateType = localStorage.getItem('rate_type')

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      { !profile.isEmpty ?
      <div>
        {receiptStatus && 
        receiptStatus === 'rate_type' ? <CheckRateType />:
        receiptStatus === 'info' ? <InfoReceipt /> :
        receiptStatus === 'initial_costs' ? <InitialCostsReceipt /> : 
        receiptStatus === 'final_costs' ? <FinalCostsReceipt /> : 
        (receiptStatus === 'rate_term' && rateType === 'Tasa Nominal') ? <NominalRateTermReceipt /> :
        (receiptStatus === 'rate_term' && rateType === 'Tasa Efectiva') ? <EffectiveRateTermReceipt /> :
        receiptStatus === 'results' ? <ResultsReceipt /> : null
        }
        {/* <NominalRateTermReceipt /> */}
      </div>
    : <LoadingScreen />}
    </div>
  )
}

export default Receipt
