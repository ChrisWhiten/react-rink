import React, { Component } from 'react';
import Block from 'material-ui/svg-icons/content/block';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';

import './styles/CancelBookingModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class CancelBookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cancellationReason: undefined,
      showOtherReason: false,
      otherReason: '',
      snackbarMessage: '',
      showSnackbar: false,
    };

    this.handleCancellationReasonChange = this.handleCancellationReasonChange.bind(this);
    this.submitCancellation = this.submitCancellation.bind(this);
    this.handleOtherReasonChange = this.handleOtherReasonChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleOtherReasonChange(e) {
    this.setState({
      otherReason: e.target.value,
    });
  }

  submitCancellation(e) {
    e.preventDefault();

    if (!this.state.cancellationReason || this.state.cancellationReason === 'cancellation-reason') {
      this.setState({
        snackbarMessage: 'Please provide a cancellation reason',
        showSnackbar: true,
      });

      console.error('Please provide a cancellation reason');
      return;
    }

    if (this.state.cancellationReason === 'other' && !this.state.otherReason) {
      this.setState({
        snackbarMessage: 'Please describe the cancellation reason',
        showSnackbar: true,
      });

      console.error('Please describe the cancellation reason');
      return;
    }

    this.props.onSubmit(this.state.cancellationReason, this.state.otherReason);
  }

  handleCancellationReasonChange(e) {
    const newState = {
      cancellationReason: e.target.value,
    };

    if (e.target.value === 'other') {
      newState.showOtherReason = true;
    }

    this.setState(newState);
  }

  handleSnackbarClose() {
    this.setState({
      snackbarMessage: '',
      showSnackbar: false,
    });
  }

  render() {
    const label = this.props.isUpdating ? 'Cancelling...' : 'Cancel Booking';
    const icon = this.props.isUpdating ? <CircularProgress className='cancel-booking-progress' thickness={1.75} /> : <Block color='#fff' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitPartipantCount}>
          <FormGroup controlId='formControlsSelect'>
            <FormControl componentClass='select' onChange={this.handleCancellationReasonChange}>
              <option value='cancellation-reason'>Please pick a cancellation reason</option>
              <option value='no-show'>No-show</option>
              <option value='user-cancellation'>User Cancellation</option>
              <option value='other'>Other</option>
            </FormControl>
          </FormGroup>
          {
            this.state.showOtherReason &&
              <FieldGroup
                autoFocus
                id='other-reason-id'
                type='text'
                onChange={this.handleOtherReasonChange}
                placeholder='Other reason'
              />
          }
          </form>
          <Snackbar
            className='cancel-booking-error-snackbar'
            open={this.state.showSnackbar}
            message={this.state.snackbarMessage}
            autoHideDuration={2000}
            onRequestClose={this.handleSnackbarClose}
          />
        </Modal.Body>
        <Modal.Footer>
        <RaisedButton
          disabled={this.props.isUpdating}
          labelColor='#fff'
          label={label}
          backgroundColor='#f54'
          icon={icon}
          onTouchTap={this.submitCancellation}
        />
        </Modal.Footer>
      </Modal>
    );
  }
};

export default CancelBookingModal;