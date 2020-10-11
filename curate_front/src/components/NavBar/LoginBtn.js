import Button from '@material-ui/core/Button';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function LoginBtn(props) {
  const classes = useStyles();

  const login = () => {
    props.history.push('Login');
  }
  
  return (
    <Button color="inherit" onClick={login}>
      <PermIdentityIcon className={classes.menuButton} />
        Login
    </Button>
  );
}

export default withRouter(LoginBtn);