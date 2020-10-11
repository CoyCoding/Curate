import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(props.loggedIn);

  useEffect(()=> {
    setLoggedIn(props.loggedIn)
  }, [props])

  console.log(props)
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Faq Kings
          </Typography>
          {loggedIn ? <LogoutBtn {...props}/> : <LoginBtn {...props}/>}
        </Toolbar>
      </AppBar>
    </div>
  );
}