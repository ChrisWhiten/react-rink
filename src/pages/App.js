import React, { PropTypes } from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import withWidth from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import './styles/App.css';

class App extends React.Component {
  render() {

    return (
      <StripeProvider apiKey='pk_test_4OhTdqQ8MvzOcJLNJjxYLl9C'>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <Header location={this.props.location} />
              <div className='main-content'>
                {this.props.children}
              </div>
          </div>
        </MuiThemeProvider>
      </StripeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
