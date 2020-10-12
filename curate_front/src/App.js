import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history.js';
import LoginPage from './views/LoginPage/LoginPage';
import Logout from './views/LoginPage/Logout';
import FaqPage from './views/FaqPage/FaqPage';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/RouteHocs/PrivateRoute';
import PublicRoute from './components/RouteHocs/PublicRoute';
import Dashboard from './views/Dashboard/Dashboard';
import CreateFAQPage from './views/Dashboard/FAQOperations/CreateFAQPage';
import NotFound from './views/404/NotFound';
import axios from 'axios';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access-token'));
  const [faqs, setFaqs] = useState(null);

  useEffect(()=> {
    axios.get('https://curate.v1.coycoding.com/FaqPosts')
        .then(function (response) {
          console.log('getFAQS')
          setFaqs(response.data)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
      });
  },[])

  return (
    <Router history={history}>
      <div className="app">
      <NavBar loggedIn={loggedIn}/>
        <Switch>
          <Route path="/" exact render={props => <FaqPage faqs={faqs} {...props}/>} />
          <PublicRoute path="/Login" exact component={LoginPage} data={{setLoggedIn, loggedIn}} />} />
          <PrivateRoute exact path='/Logout'  data={{loggedIn, setLoggedIn}} component={Logout}/>

          <PrivateRoute exact path='/Dashboard' data={{loggedIn, faqs, setFaqs}} component={Dashboard}/>

          <PrivateRoute exact path='/Dashboard/Create' data={{loggedIn, faqs, setFaqs}} component={CreateFAQPage}/>

          <PrivateRoute exact path='/Dashboard/Page/:page' data={{loggedIn, faqs, setFaqs}} component={Dashboard}/>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
