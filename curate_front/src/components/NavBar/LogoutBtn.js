import Button from '@material-ui/core/Button';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardIcon from '@material-ui/icons/Dashboard';
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

function LogoutBtn(props) {
  const classes = useStyles();

  const logout = () => {
    props.history.push('/Logout');
  }

  // This could just be a link
  const link = () => {
    props.history.push('/Dashboard');
  }

  return (
    <>
      <Button color="inherit" onClick={link}>
        <DashboardIcon className={classes.menuButton} />
          Dashboard
      </Button>
      <Button color="inherit" onClick={logout}>
        <PermIdentityIcon className={classes.menuButton} />
          Logout
      </Button>
    </>
  );
}

export default withRouter(LogoutBtn);