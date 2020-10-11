import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history.js';
import LoginPage from './views/LoginPage/LoginPage';
import FaqPage from './views/FaqPage/FaqPage';
import PrivateRoute from './components/RouteHocs/PrivateRoute';
import PublicRoute from './components/RouteHocs/PublicRoute';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access-token'));

  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <PublicRoute path='/' exact component={FaqPage}/>
          <PublicRoute path='/Login' exact setLoggedIn={setLoggedIn} component={LoginPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
