import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Components/signup';
import Signin from './Components/singin'
import {Link , BrowserRouter as Router , Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
     <header id="Pageheader">
        <h1>Page Heading</h1>
      </header>  
    <div className="App">
        <Switch>
        <Route path = "/signup"  > 
        <Signup/>
         </Route> 
         <Route path ="/" >
          <Signin/>
         </Route>
        </Switch>
        
    </div>
    </Router>
  );
}

export default App;
