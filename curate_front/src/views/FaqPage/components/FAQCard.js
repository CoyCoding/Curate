import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

// styles
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: '2px solid rgba(0, 50, 100, .525)',
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  question: {
    fontWeight: 700,
    color: '#3f51b5',
    marginRight: 'auto'
  },
  answer:{
        padding: '10px 0 10px 20px'
  },
  btnM: {
    border: '2px solid #3f51b5',
    color: '#3f51b5',
    borderRadius: '50%'
  },
  btnP: {
    border: '2px solid grey',
    color: 'grey',
    borderRadius: '50%'
  }

}));

export default function FAQCard(faq) {
  const [expanded, setExpanded] = React.useState({});
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded({...expanded, [panel]: !expanded[panel]});
  };

  return (
    <>
      <Accordion onChange={handleChange(faq.id)} key={faq.id}>
        <AccordionSummary   aria-controls={`faq-${faq.id}-control`} >
          <Typography className={classes.question} >{faq.question}</Typography>
          {expanded[faq.id] ? <RemoveIcon className={classes.btnP}/> : <AddIcon className={classes.btnM}/>}
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.answer}>
            {faq.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
    );
  }