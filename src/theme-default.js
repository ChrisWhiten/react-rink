import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, grey900} from 'material-ui/styles/colors';

const colour = blue600;
//const colour = 'rgb(0, 132, 137)';
const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: colour
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: colour,
  },
  tabs: {
    backgroundColor: 'white',
    textColor: 'rgb(72, 72, 72)',
    selectedTextColor: colour,
  },
  inkBar: {
    backgroundColor: colour,
  }
});


export default themeDefault;