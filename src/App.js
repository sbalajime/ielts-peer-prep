import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Components/signup';
import Signin from './Components/singin'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const appp = () => {
  let a = 1
  let b = 3
}
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup"  >
            <Signup />
          </Route>
          <Route path="/" >
            <Signin />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
