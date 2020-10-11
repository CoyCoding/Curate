import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';
import Title from './Title';

export default function NavBar(props) {
  const [loggedIn, setLoggedIn] = useState(props.loggedIn);

  useEffect(()=> {
    setLoggedIn(props.loggedIn)
  }, [props])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Title/>
          {loggedIn ? <LogoutBtn {...props}/> : <LoginBtn {...props}/>}
        </Toolbar>
      </AppBar>
    </div>
  );
}