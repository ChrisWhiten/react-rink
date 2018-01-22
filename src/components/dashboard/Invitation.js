import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import './styles/Invitation.css';

class Invitation extends React.Component {

  _declineInvitation() {
    this.props.onDecline();
  }

  _acceptInvitation() {
    console.log('accept', this.props.invite);
  }

  render() {
    return (
      <div className='invitation'>
        <h3 className='invitation-time'>
          { moment(this.props.invite.datetime).format('llll') }
        </h3>
        <h4 className='invitation-description'>
          {this.props.invite.inviter} has invited you to {this.props.invite.eventTypeName} @ {this.props.invite.venueName}
        </h4>
        <div className='accept-invitation-button'>
          <RaisedButton primary={true} label={`Accept ($${this.props.invite.price.toFixed(2)})`} onTouchTap={this._acceptInvitation.bind(this)} />
        </div>
        <div className='decline-invitation-button'>
          <RaisedButton labelColor='white' backgroundColor='#f56954' label='Decline' onTouchTap={this._declineInvitation.bind(this)} />
        </div>
      </div>
    );
  }
}

Invitation.propTypes = {
  invite: PropTypes.object,
  onDecline: PropTypes.func.isRequired,
};

export default Invitation;