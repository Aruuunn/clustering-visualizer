import { createMuiTheme , responsiveFontSizes } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';


const theme = createMuiTheme({
  palette: {
      type:'dark',
    primary: {
      main: '#0000',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default responsiveFontSizes(theme);