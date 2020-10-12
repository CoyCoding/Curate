import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bg:{
    display: 'flex',
    flexGrow: '1',
    background: 'linear-gradient(45deg, #00000073, #0a0a0a63), url("./images/travolta.gif")',
    backgroundSize: 'cover',
    backgroundPosition: 'top'
  },
  code:{
    fontSize: '15rem',
    color: 'white',
    margin: '48px'
  }
}));

function NotFound(props){
  const classes = useStyles();
  return (
    <>
        <div className={classes.bg}>
          <div className={classes.code}>404</div>
        </div>
    </>
  )

}


export default NotFound;
