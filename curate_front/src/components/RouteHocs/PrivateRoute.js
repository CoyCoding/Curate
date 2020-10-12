import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, data, ...rest}) =>  (
  <Route {...rest} render={ (props) => {
        return data.loggedIn ? <Component {...data} {...props}/> : <Redirect to={''}/>
    }}
  />
);

export default PrivateRoute;