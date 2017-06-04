import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import NewReleases from 'material-ui/svg-icons/av/new-releases';
import Invitation from './Invitation';

import './InvitationsContainer.css';

class InvitationsContainer extends React.Component {

  _renderInvitations(invitations) {
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

    return (
      <Paper className='invitations-container'>
        <div className='invitations-title'>
          <NewReleases className='upcoming-box-icon' />
          <h3 className='upcoming-box-title'>
            Invitations
          </h3>
        </div>
        <div className='invitations-content'>
          { this._renderInvitations(this.props.invitations) }
        </div>
      </Paper>
    );
  }
}

InvitationsContainer.propTypes = {
  invitations: PropTypes.array,
  onDeclineInvitation: PropTypes.func.isRequired,
};

export default InvitationsContainer;