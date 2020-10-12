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
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  body:{
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    background: 'linear-gradient(45deg, #5775d6, #8f009866), url(./images/lines.jpg)',
    backgroundSize: 'cover'
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
    paddingBottom: '48px',
    backgroundColor: '#fef'
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [validating, setValidating] = useState(false);
  const [errors, setErrors] = useState({email: [], password: []});

  useEffect(()=> {
    ValidatorForm.addValidationRule('short', (value) => {
       if (value.length < 5) {
           return false;
       }
       return true;
    });
  });

  const handleSubmit = (e) =>{
    // need props to pass this all the way up to App
    setValidating(true);
    axios.post('https://curate.v1.coycoding.com/Login', {email, password})
        .then(function (response) {
          console.log(response)
          localStorage.setItem('access-token', response.data.token);
          props.setLoggedIn(response.data.token);
          props.history.push('/Dashboard');
        })
        .catch((error) => {
          console.log(error);
          const email = error.response.data.errors.email || [];
          const password = error.response.data.errors.password || [];
          setErrors({email, password})
          setValidating(false);
      });
  }
  return (
    <div className={classes.body}>
      <Container >
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
              onSubmit={handleSubmit}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={event => setEmail(event.target.value)}
                value={email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                autoFocus
              />
              <ErrorDisplay errors={errors.email}/>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                onChange={event => setPassword(event.target.value)}
                value={password}
                type="password"
                validators={['short']}
                errorMessages={['Password needs to be at least 4 characters']}
                id="password"
                autoComplete="current-password"
              />
              <ErrorDisplay errors={errors.password}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={validating}
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
    </div>
  );
}