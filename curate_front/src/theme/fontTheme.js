import { createMuiTheme } from '@material-ui/core/styles';
import '../App.css'
const font =  "'Raleway', sans-serif !important";

const theme = createMuiTheme();

theme.typography.h1 = {
  ...theme.typography.h1,
  fontFamily: font ,
  fontWeight: '200 !important',
  fontSize: '1.5rem !important',
  '@media (min-width:600px) ': {
    fontSize: '2.4rem !important',
    fontWeight: '100 !important'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.9rem !important',
  },
};

theme.typography.title = {
  fontFamily: font,
  fontSize: '2rem'
}

export default theme;