import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, data, ...rest }) =>  (
  <Route {...rest} render={ (props) => {
        return !data.loggedIn ? <Component {...data} {...props}/> : <Redirect to={'Dashboard'}/>
    }}
  />
)

export default PublicRoute;