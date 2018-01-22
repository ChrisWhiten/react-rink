import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import globalStyles from '../styles';

const PageBase = (props) => {

    const {navigation} = props;

    return (
      <div>
        <span style={globalStyles.navigation}>{navigation}</span>

        <Paper style={globalStyles.paper}>
          {props.children}
          <div style={globalStyles.clear}/>
        </Paper>
      </div>
    );
};

PageBase.propTypes = {
  navigation: PropTypes.string,
  children: PropTypes.element
};

export default PageBase;
