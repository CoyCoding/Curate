import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) =>  (
    <Route {...rest} render={ (props) => {
      console.log(props);
        if (true){
          return <Redirect to="/" />
        } else {
          return <Component {...props}/>
        }
      }}
    />
);

export default PrivateRoute;