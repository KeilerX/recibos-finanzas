import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './layout/navbar/NavBar'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/home/Home'
import CreateCurrency from './components/currency/CreateCurrency'
import Currency from './components/currency/Currency'
import CheckCurrency from './components/currency/CheckCurrency'
import Receipt from './components/receipt/Receipt'
import TableReceipt from './components/receipt/TableReceipt'
import TableWallet from './components/receipt/TableWallet'
import ResultsWallet from './components/receipt/ResultsWallet'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/register"><Register /></Route>
            <Route path="/currency"><Currency /></Route>
            <Route path="/check-currency"><CheckCurrency /></Route>
            <Route path="/create-currency"><CreateCurrency /></Route>
            <Route path="/receipt"><Receipt /></Route>
            <Route path="/receipt-table"><TableReceipt /></Route>
            <Route path="/wallet-table"><TableWallet/></Route>
            <Route path="/wallet/:id"><ResultsWallet/></Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
