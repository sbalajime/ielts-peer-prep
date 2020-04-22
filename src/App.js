import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Containers/Register';
import Login from './Containers/LogIn';
import Essay from './Containers/Essay';
import Review from './Containers/Review';
import Dashboard from './Containers/Dashboard';
import { Link, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import 'typeface-roboto';

const protectedRoute = (RouteComponent, props) => localStorage.getItem('token') ? <RouteComponent {...props} /> : <Redirect to={{ pathname: '/login' }} />
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} />} />
          <Route path="/" exact render={props => protectedRoute(Dashboard, props)} />
          <Route path="/login" exact render={props => <Login {...props} />} />
          <Route path="/write" exact render={props => protectedRoute(Essay, props)} />
          <Route path="/review" exact render={props => protectedRoute(Review, props)} />
        </Switch>

      </div>
    </Router >
  );
}

export default App;
