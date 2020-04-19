import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Components/Register';
import Login from './Components/LogIn';
import Essay from './Components/Essay';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'typeface-roboto';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} />} />
          <Route path="/" exact render={props => <Login {...props} />} />
          <Route path="/login" exact render={props => <Login {...props} />} />
          <Route path="/write" exact render={props => <Essay {...props} />} />
        </Switch>

      </div>
    </Router >
  );
}

export default App;
