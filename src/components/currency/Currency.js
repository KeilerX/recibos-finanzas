import { React } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Redirect, useHistory } from 'react-router-dom'
import LoadingScreen from '../../layout/loading_screen/LoadingScreen'
import Button from '@material-ui/core/Button'
import TableCustom from '../../shared/TableCustom'
import { classes } from 'istanbul-lib-coverage';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    minWidth: 500,
  },
  button: {
    marginBottom: 20,
  },
  noRoot: {
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: 'white',
    color: 'black',
    padding: '20px 20px 20px 20px',
    borderRadius: 5,
    opacity: 0.90,
  }
})

const Currency = () => {
  const classes = useStyles()
  const history = useHistory()
  const { auth } = useSelector((state) => state.firebase)
  useFirestoreConnect(props => [{
    collection: 'currencies',
    where: ['uid', '==', auth.uid]
  }])
  const { profile } = useSelector((state) => state.firebase)
  const { currencies } = useSelector((state) => state.firestore.data)
  
  if (!auth.uid) {
    return <Redirect to="/login" />
  }

  const columns = [
    { id: 'n', label: 'Nª', minWidth: 50, align: 'center' },
    { id: 'symbol', label: 'Símbolo Moneda', minWidth: 50, align: 'center' },
    { id: 'name', label: 'Nombre Moneda', minWidth: 50, align: 'center' },
  ]

  const myCurrencies = [];
  let idx = 1
  for (const c in currencies) {
    myCurrencies.push({
      n: { value: idx, id: 'n' },
      symbol: { value: currencies[c].symbol, id: 'symbol' },
      name: { value: currencies[c].name, id: 'name' },
    })
    idx = idx + 1
  }

  return (
    <div>
      { !profile.isEmpty ?
        <div className={classes.root}>
          <Button variant="contained" color="secondary" className={classes.button} onClick={e => history.push('/create-currency')}>
            Agregar Moneda
          </Button>
          {currencies ?
           <TableCustom rows={myCurrencies} columns={columns}/>
           : <div className={classes.noRoot}>No cuenta con ninguna moneda registrada</div>}
        </div>
        : <LoadingScreen />}
    </div >
  )
}

export default Currency

