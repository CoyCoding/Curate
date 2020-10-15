import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { authHeaders } from './../../utils/authHeaders';

const Logout = (props) => {
  axios.post('https://curate.v1.coycoding.com/Logout',        {headers: {
            "Authorization" : `Bearer ${localStorage.getItem('access-token')}`,
        }})
      .then(function (response) {
        console.log(response)
        localStorage.removeItem('access-token');
        props.setLoggedIn(null);
        return ( <Redirect to="/"/>);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('access-token');
          props.setLoggedIn(false);
          props.setLoggedIn(null);
          return ( <Redirect to="/"/>);
  });

}

export default Logout;