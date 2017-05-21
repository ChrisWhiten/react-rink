import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './ParticipantItem.css';

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
