import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';


const theme = createMuiTheme({
  palette: {
      type:'dark',
      primary: {
        main: '#000',
        contrastText:'#fff'
      },
      secondary: amber,
  },
});

export default theme;
