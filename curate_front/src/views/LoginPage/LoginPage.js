import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Copyright from './components/Copyright';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  body:{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  shadowPadding:{
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    paddingTop: '48px',
    paddingBottom: '48px'
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(()=> {
    ValidatorForm.addValidationRule('Length', (value) => {
       if (value.length < 4) {
           return false;
       }
       return true;
    });
  });

  const handleSubmit = (e) =>{
    // need props to pass this all the way up to App
    console.log(email, password)
    // axios.get('https://curate.v1.coycoding.com/FaqPosts').then((res)=>{
    //   console.log(res)
    // }).catch((e) => console.log(e))

    axios.post('https://curate.v1.coycoding.com/Login', {email, password})
        .then(function (response) {
          localStorage.setItem('access-token', response.data.token);
          props.setLoggedIn(response.data.token);
          props.history.push('Dashboard');
        })
        .catch(function (error) {
          console.log(error);
      });
  }

  return (
    <Container className={classes.body}>
      <Container className={classes.shadowPadding}  maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <ValidatorForm className={classes.form}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}>
            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={event => setEmail(event.target.value)}
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              validators={['required']}
              errorMessages={['this field is required']}
              autoFocus
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={event => setPassword(event.target.value)}
              value={password}
              type="password"
              validators={['required', 'Length:4']}
              errorMessages={['this field is required', 'password must be longer than 4']}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </ValidatorForm>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Container>
  );
}