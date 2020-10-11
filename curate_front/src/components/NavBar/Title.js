import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  pointer:{
    cursor: 'pointer'
  }
}));

const Title = (props) => {
  const classes = useStyles();

  function goHome(){
      props.history.push('/');
  }
  
  return (
    <Link onClick={goHome}color="inherit" underline="always" className={classes.pointer}>
      Faq Kings
    </Link>
  );
}


export default withRouter(Title);