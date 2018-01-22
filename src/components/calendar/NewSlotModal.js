import React, { Component } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import {
  Modal,
} from 'react-bootstrap';

import './styles/NewSlotModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class NewSlotModal extends Component {
  constructor(props) {
    super(props);

    this.createSlot = this.createSlot.bind(this);
    this.decline = this.decline.bind(this);
  }

  decline() {
    this.props.decline();
  }

  createSlot(e) {
    this.props.onSubmit({
      startTime: new Date(this.props.createSlotCandidate.time).getTime(),
      duration: 60, // TODO: make configurable
      totalSlots: 20, // TODO: make configurable
      locationId: this.props.createSlotLocationId,
    });
  }

  render() {
    const label = this.props.isUpdating ? 'Creating...' : 'Yes';
    const icon = this.props.isUpdating ? <CircularProgress className='creating-new-slot-progress' thickness={1.75} /> : <ThumbsUp color='#fff' />;
    const declineLabel = 'No';
    const declineIcon = <ThumbsDown color='#f54' />;

    if (!this.props.createSlotCandidate) return null;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new slot at {moment(this.props.createSlotCandidate.time).format('LT')}?</Modal.Title>
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
        <div className='accept-new-slot-button'>
          <RaisedButton
            disabled={this.props.isUpdating}
            labelColor='#fff'
            label={label}
            backgroundColor='#52B266'
            icon={icon}
            onTouchTap={this.createSlot}
          />
        </div>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default NewSlotModal;