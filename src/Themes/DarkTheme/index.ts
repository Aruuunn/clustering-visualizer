import { createMuiTheme , responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      type:'dark',
    primary: {
      main: '#0000',
    },
    secondary: {
      main: '#FF9933',
    },
  },
});

export default responsiveFontSizes(theme);