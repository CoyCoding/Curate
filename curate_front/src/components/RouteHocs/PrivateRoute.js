import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, data, ...rest}) =>  (
    <Route {...rest} render={(props) => {
        if (!data.loggedIn){
          return <Redirect to="/Login" />
        } else {
          return <Component {...data} {...props}/>
        }
      }}
    />
);

export default PrivateRoute;