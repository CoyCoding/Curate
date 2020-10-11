import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FAQCard from './FAQCard';

const useStyles = makeStyles((theme) => ({
  contentWrap:{
    margin: '48px auto 48px',
    boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2),' +
               '0px -4px 5px 0px rgba(0,0,0,0.14),' +
               '0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderTopRightRadius: '16px',
    borderTopLeftRadius: '16px',
    overflow: 'hidden'
  },
}));

export default function FAQs(props) {
  const classes = useStyles();
  console.log(props)
  return (
    <Container>
      <Container disableGutters className={classes.contentWrap}>
        {buildFaqCards(props.faqs)}
      </Container>
    </Container>
  );
}

const buildFaqCards = (faqs) => {
  return faqs.map((faq)=>(
    <FAQCard {...faq}/>
  ))
}