import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import Tabs from '../components/tabs/Tabs';
import withWidth from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import './App.css';

class App extends React.Component {
  render() {

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header />

            <Tabs location={this.props.location} />
            <div className='main-content'>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
