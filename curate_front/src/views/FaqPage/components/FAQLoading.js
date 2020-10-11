import React from 'react';
import { makeStyles,} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loading from '../../../components/Loading/Loading';

const useStyles = makeStyles((theme) => ({
  body:{
    background: '#e0e0e0',
    flexGrow: 1,
  },
  loading:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function FAQLoading() {
  const classes = useStyles();

  return (
    <Grid className={classes.body + ' ' + classes.loading}>
          <Loading/>
    </Grid>
  );
}








