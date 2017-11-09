import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import ParticipantItem from './ParticipantItem';

import './styles/ParticipantList.css';

class ParticipantList extends React.Component {

  _renderParticipants(participants) {
    if (!participants) {
      // display a message saying "nobody currently registered"
      // always include a link to invite people
      return (
        <div className='no-participants'>
          Nobody is participating
        </div>
      );
    }

    return participants.map(p => {
      return (
        <ParticipantItem key={`participant-${p.id}`} participant={p} />
      )
    })
  }

  _renderInviteLink() {
    // TODO:
    // if you have permissions, render this...
    // what are the permissions?  if you own the event you have permissions
    // we should also make it a config to let participants invite people (optionally)
    return;
  }

  render() {
    const {event} = this.props;

    return (
      <Paper className='participant-list-container'>
        <div className='participant-list-header'>
          Participants
        </div>
        <div className='participant-list-content'>
          { this._renderParticipants(event.participants) }
          { this._renderInviteLink() }
        </div>
      </Paper>
    );
  }
}

ParticipantList.propTypes = {
  event: PropTypes.object,
};

export default ParticipantList;
