import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme/fontTheme';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  pointer:{
    cursor: 'pointer'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Raleway',
    fontSize: '1.2rem',
    fontWeight: '300',
  },
}));

const Title = (props) => {
  const classes = useStyles();

  function goHome(){
      props.history.push('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography className={classes.title}>
        <Link onClick={goHome}color="inherit" underline="always"  className={classes.pointer}>
          FAQ Kings
        </Link>
      </Typography>
    </ThemeProvider>
  );
}


export default withRouter(Title);