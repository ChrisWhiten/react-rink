import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import Tabs from '../components/tabs/Tabs';
import withWidth from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';

class App extends React.Component {
  render() {
    const styles = {
      header: {
        paddingLeft:  0
      },
      container: {
        paddingLeft:  0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header} />

            <Tabs location={this.props.location} />
            <div style={styles.container}>
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
