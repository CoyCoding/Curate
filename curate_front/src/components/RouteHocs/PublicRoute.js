import React from 'react';
import { Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, auth, ...rest }) =>  (
  <Route {...rest} render={ (props) => {
        return <Component {...props}/>
    }}
  />
)

export default PublicRoute;