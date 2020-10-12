import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  body:{
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    background: 'linear-gradient(45deg, #5775d6, #8f009866), url(./images/lines.jpg)',
    backgroundSize: 'cover'
  },
  test:{
    fontSize: "1.3rem",
    marginTop: '20px',
    width: '100%',
    height: '100px',
    resize: 'none',
    fontFamily: 'Raleway'
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
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  shadowPadding:{
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    paddingTop: '48px',
    paddingBottom: '48px',
    backgroundColor: '#fef',
    maxWidth: '600px',
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const [form, setForm] = useState({question: '', answer: ''});
  const [validating, setValidating] = useState(false);
  const [errors, setErrors] = useState({});
  const [sucess, setSucess] = useState(false);

  const authHeaders = {
      headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access-token')}`,
      }
  }
  const handleChange = (e) =>{
    console.log(e.target)
      const key = e.target.name;
      setErrors({})
      setForm({...form, [key]: e.target.value})
  }

  const handleSubmit = (e) =>{
    const question = form.question;
    const answer = form.answer;
    console.log(question, answer)
    console.log(errors.message)
    if(!answer || !question) {
      return setErrors({message: 'Both a question and an answer are required'});
    }

    setValidating(true);
    console.log(question, answer, authHeaders)
    axios.post('https://curate.v1.coycoding.com/FaqPosts', {question, answer}, authHeaders)
        .then(function (response) {
          setSucess(true);
          props.setFaqs([...props.faqs, {question, answer}])
          setValidating(false);
        })
        .catch(function (error) {
          console.log(error);
          setValidating(false);
      });
  }

  return (
    <div className={classes.body}>
      <Container >
        <Container className={classes.shadowPadding}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create/Edit FAQ
            </Typography>
            <ValidatorForm className={classes.form}
              onSubmit={handleSubmit}
              onError={errors => console.log(errors)}>
              <Typography component="h3" variant="h6">Question</Typography>
              <textarea value={form['question']} name="question" onChange={handleChange} className={classes.test}></textarea>
              <Typography component="h3" variant="h6">Answer</Typography>
              <textarea name="answer" value={form['answer']} onChange={handleChange} className={classes.test}></textarea>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={validating}
                className={classes.submit}
              >
                Submit
              </Button>
            </ValidatorForm>
            {errors.message ? <>{errors.message}</> : <></>}
            {sucess ? <>Hey that sent I just don't want to spend a bunch of hours on some crazy blinking lights.</> : <></>}
          </div>
        </Container>
      </Container>
    </div>
  );
}