import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history.js';
import LoginPage from './views/LoginPage/LoginPage';
import Logout from './views/LoginPage/Logout';
import FaqPage from './views/FaqPage/FaqPage';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/RouteHocs/PrivateRoute';
import PublicRoute from './components/RouteHocs/PublicRoute';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access-token'));

  return (
    <Router history={history}>
      <div className="app">
      <NavBar loggedIn={loggedIn}/>
        <Switch>
          <Route path='/' exact component={FaqPage}/>
          <PublicRoute path="/Login" component={LoginPage} data={{setLoggedIn, loggedIn}} />} />
        <PrivateRoute path='/Logout' data={{loggedIn, setLoggedIn}} component={Logout}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
