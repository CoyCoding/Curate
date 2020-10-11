import React, { useEffect, useState }from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FAQs from './components/FAQs';
import FAQLoading from './components/FAQLoading';
import theme from '../../theme/fontTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  center:{
    display: 'flex',
    justifyContent: 'center',
  },
  heroBar:{
    background: '#4c4c4c',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '48px',
    zIndex: '-1',
  },
  heroText:{
    marginBottom: '16px',
    textShadow: '0 0 5px black',
  },
  divider:{
    backgroundColor: 'rgb(255 255 255 / 50%)',
    maxWidth: '75%',
    margin: 'auto',
    boxShadow: '0 0 5px black',
  },
  spacer:{
    height: '100vh',
  },
  body:{
    background: '#e0e0e0',
    flexGrow: 1,
  },
  loading:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrap:{
    margin: '48px auto 48px',
    boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2),' +
               '0px -4px 5px 0px rgba(0,0,0,0.14),' +
               '0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  content:{
    background: 'white',
    padding: '16px',
    borderBottom: '#a0006f 10px solid'
  }
}));

export default function FaqPage(props) {
  const classes = useStyles();
  const [faqs, setFaqs] = useState(props.faqs);
  console.log(props)
  useEffect(()=> {
    setFaqs(props.faqs)
  }, [props.faqs])

  return (
    <>
    <Grid className={classes.heroBar} item xs={12}>
        <div>
          <ThemeProvider theme={theme}>
            <Typography variant="h1" className={classes.heroText}>
              Frequently Asked Questions
            </Typography>
          </ThemeProvider>
          <Divider className={classes.divider}/>
        </div>

    </Grid>
    {props.faqs ? <FAQs {...props}/> : <FAQLoading />}
    </>
  );
}
