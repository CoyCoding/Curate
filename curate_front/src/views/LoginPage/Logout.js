import React from 'react';
import { Redirect } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('access-token');
  console.log(localStorage.getItem('access-token'))
  return <Redirect to={''} />
}

export default Logout;