import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';
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
  const [sucess, setSucess] = useState({});
  const [editId, setEditId] = useState(-1);

  // Checks to see if we are in edit mode and loads the form.
  useEffect(()=>{
    const id = props.match.params.id;
    if(id && props.faqs){
      const faqs = props.faqs;
      for(var i = 0; i < faqs.length; i++){
        if(faqs[i].id === Number(id)){
          setEditId(i);
          setForm({question: faqs[i].question, answer: faqs[i].question});
          break;
        }
      }
    }
  },[props.match.params.id, props.faqs])

  // Stored authHeaders most of the time I put these in its own file.
  const authHeaders = {
      headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access-token')}`,
      }
  }

  // Handle all text form changes. And clear errors
  const handleChange = (e) =>{
      const key = e.target.name;
      setErrors({})
      setSucess({})
      setForm({...form, [key]: e.target.value})
  }

  // Handle both create and edit.
  const handleSubmit = (e) =>{
    return props.edit ? edit() : create();
  }

  // Axios create new FAQ
  // In larger projects I would have this in my Redux / action
  // I mean the form should not be controlling the data
  const create = () => {
    const question = form.question;
    const answer = form.answer;
    if(!answer || !question) {
      return setErrors({message: 'Both a question and an answer are required'});
    }

    setValidating(true);
    axios.post('https://curate.v1.coycoding.com/FaqPosts', {question, answer}, authHeaders)
        .then(function (response) {
          setSucess({message: 'you will never see this'});
          props.setFaqs([...props.faqs, {...response.data} ]);
          setForm({question: '', answer: ''});
          setValidating(false);
        })
        .catch(function (error) {
          setValidating(false);
          return setErrors({message: 'Uhhh there was an error with the server I guess'});
      });
  }

  // Axios Edit new FAQ
  const edit = () => {
    const question = form.question;
    const answer = form.answer;
    const id = props.match.params.id;

    if(!answer || !question) {
      return setErrors({message: 'Both a question and an answer are required'});
    }

    setValidating(true);
    axios.put('https://curate.v1.coycoding.com/FaqPosts/' + id, {question, answer}, authHeaders)
        .then(function (response) {
          setSucess({message: 'you wont see this either'});
          const faqs = props.faqs;
          faqs[editId] = response.data;
          props.setFaqs([...faqs]);
          setValidating(false);
        })
        .catch(function (error) {
          setValidating(false);
          return setErrors({message: 'Uhhh there was an error with the server I guess'});
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
      {sucess.message ? <>Hey that sent I just don't want to spend a bunch of hours on some crazy blinking lights.</> : <></>}
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