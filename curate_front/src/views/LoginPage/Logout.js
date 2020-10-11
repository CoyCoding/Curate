import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  localStorage.removeItem('access-token');
  props.setLoggedIn(null);
  return <Redirect to={''} />
}

export default Logout;