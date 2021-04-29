import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './layout/navbar/NavBar'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/home/Home'

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
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
