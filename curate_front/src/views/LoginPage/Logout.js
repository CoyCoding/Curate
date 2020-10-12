import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  localStorage.removeItem('access-token');
  props.setLoggedIn(false);
  return ( <Redirect to="/"/>);
}

export default Logout;