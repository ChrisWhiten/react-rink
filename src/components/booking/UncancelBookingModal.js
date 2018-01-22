import React, { Component } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Modal,
} from 'react-bootstrap';

import './styles/UncancelBookingModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class UncancelBookingModal extends Component {
  constructor(props) {
    super(props);

    this.uncancel = this.uncancel.bind(this);
    this.decline = this.decline.bind(this);
  }

  decline() {
    this.props.decline();
  }

  uncancel(e) {
    this.props.onSubmit();
  }

  render() {
    const label = this.props.isUpdating ? 'Uncancelling...' : 'Yes';
    const icon = this.props.isUpdating ? <CircularProgress className='uncancel-booking-progress' thickness={1.75} /> : <ThumbsUp color='#fff' />;
    const declineLabel = 'No';
    const declineIcon = <ThumbsDown color='#f54' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Are you'd like to uncancel this booking?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <RaisedButton
          disabled={this.props.isUpdating}
          labelColor='#f54'
          label={declineLabel}
          backgroundColor='#fff'
          icon={declineIcon}
          onTouchTap={this.decline}
        />
        <div className='uncancel-button'>
          <RaisedButton
            disabled={this.props.isUpdating}
            labelColor='#fff'
            label={label}
            backgroundColor='#52B266'
            icon={icon}
            onTouchTap={this.uncancel}
          />
        </div>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default UncancelBookingModal;