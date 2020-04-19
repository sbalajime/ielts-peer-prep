import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Components/Register';
import Login from './Components/LogIn'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'typeface-roboto';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup"  >
            <Signup />
          </Route>
          <Route path="/" >
            <Login />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
