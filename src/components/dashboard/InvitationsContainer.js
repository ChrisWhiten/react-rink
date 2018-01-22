import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import NewReleases from 'material-ui/svg-icons/av/new-releases';
import CircularProgress from 'material-ui/CircularProgress';
import Invitation from './Invitation';

import './styles/InvitationsContainer.css';

class InvitationsContainer extends React.Component {

  _renderInvitations(invitations) {
    console.log('rendering invitations', invitations);
    return (
      invitations.map(i => {
        return (
          <Invitation key={`invite-${i.id}`} invite={i} onDecline={() => this.props.onDeclineInvitation(i.id)} />
        );
      })
    );
  }

  render() {
    // only render this if there are invitations to render
    if (!this.props.invitations) {
      return null;
    }

    if (this.props.invitations.isFetching) {
      return (
        <div style={{position: 'relative', width: '100%'}}>
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        </div>
      );
    } else {
      return (
        <Paper className='invitations-container'>
          <div className='invitations-title'>
            <NewReleases className='upcoming-box-icon' />
            <h3 className='upcoming-box-title'>
              Invitations
            </h3>
          </div>
          <div className='invitations-content'>
            { this._renderInvitations(this.props.invitations.items) }
          </div>
        </Paper>
      );
    }
  }
}

InvitationsContainer.propTypes = {
  invitations: PropTypes.object,
  onDeclineInvitation: PropTypes.func.isRequired,
};

export default InvitationsContainer;