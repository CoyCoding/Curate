import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { authHeaders } from '../../../../utils/authHeaders';
import ErrorDisplay from '../../../../components/ErrorDisplay/ErrorDisplay';
import { findFAQById } from '../utils/findFAQById';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  body:{
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    background: 'linear-gradient(45deg, #5775d6, #8f009866), url(/images/lines.jpg)',
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
  const [errors, setErrors] = useState([]);
  const [success, setsuccess] = useState({});

  // Checks to see if we are in edit mode and loads the form.
  useEffect(()=>{
    const id = props.match.params.id;
    const faqs = props.faqs;
    if(id && faqs){
      const i = findFAQById(faqs, id);
      setForm({question: faqs[i].question, answer: faqs[i].question});
    }
  },[props.match.params.id, props.faqs])

  // Handle all text form changes. And clear errors
  const handleChange = (e) =>{
      const key = e.target.name;
      setErrors([])
      setsuccess([])
      setForm({...form, [key]: e.target.value})
  }

  // Handle both create and edit.
  const handleSubmit = (e) =>{
    return props.edit ? edit() : create();
  }

  // Axios create new FAQ
  // In larger projects I would have this in my Redux / action
  const create = () => {
    const question = form.question;
    const answer = form.answer;
    if(!answer || !question) {
      return setErrors(['Both a question and an answer are required']);
    }

    setValidating(true);
    axios.post('https://curate.v1.coycoding.com/FaqPosts', {question, answer}, authHeaders)
        .then(function (response) {
          setsuccess({message: 'success'});
          props.setFaqs([...props.faqs, {...response.data} ]);
          setForm({question: '', answer: ''});
          setValidating(false);
        })
        .catch(function (error) {
          setValidating(false);
          return setErrors(['Uhhh there was an error with the server I guess']);
      });
  }

  // Axios Edit new FAQ
  const edit = () => {
    const question = form.question;
    const answer = form.answer;
    const id = props.match.params.id;

    if(!answer || !question) {
      return setErrors(['Both a question and an answer are required']);
    }

    setValidating(true);
    axios.put('https://curate.v1.coycoding.com/FaqPosts/' + id, {question, answer}, authHeaders)
        .then(function (response) {
          setsuccess({message: 'success'});
          const faqs = props.faqs;
          const i = findFAQById(faqs, id)
          faqs[i] = response.data;
          props.setFaqs([...faqs]);
          setValidating(false);
          setForm({question: response.data.question, answer: response.data.answer});
        })
        .catch(function (error) {
          setValidating(false);
          return setErrors(['Congrats to got to the secret error. Actually there must have been a problem with the server']);
      });
  }

  // This form could be taken out and passed props but much easier to
  // read this way in my opinion.
  const faqForm = () => (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {props.edit ? 'Edit' : 'Create'} FAQ Post
      </Typography>
      <ValidatorForm className={classes.form}
        onSubmit={handleSubmit}>
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
      <ErrorDisplay errors={errors}/>
      {success.message ? <>{success.message}</> : <></>}
    </div>
  )

  return (
    <div className={classes.body}>
      <Container >
        <Container className={classes.shadowPadding}>
          <CssBaseline />
            {(props.edit && props.faq) ? <> loading </> : faqForm()}
        </Container>
      </Container>
    </div>
  );
}
