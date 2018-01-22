import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

import './styles/ParticipantItem.css';

class ParticipantItem extends React.Component {


  render() {
    const {participant} = this.props;

    return (
      <Link key={`link-${participant.id}`} to={`/users/${participant.id}`} style={{textDecoration: 'none'}}>
        <div className='participant-item-container'>
          {participant.name}
        </div>
      </Link>
    );
  }
}

ParticipantItem.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantItem;
