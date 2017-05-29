import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, grey400} from 'material-ui/styles/colors';

const colour = blue600;
// const colour = 'rgb(0, 132, 137)';
const themeDefault = getMuiTheme({
  fontFamily: 'Source Sans Pro, sans-serif',
  palette: {
    primary1Color: colour,
    // primary2Color: 'rgb(0, 132, 137)',
    primary2Color: colour,
    // primary3Color: '#ffa000',
    primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
  appBar: {
    height: 57
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