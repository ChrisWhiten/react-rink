import React, { Component } from 'react';
import People from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';

import './styles/EditParticipantsModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EditParticipantsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: this.props.booking.item.slotCount,
    };

    this.handleParticipantChange = this.handleParticipantChange.bind(this);
    this.submitPartipantCount = this.submitPartipantCount.bind(this);
  }

  submitPartipantCount(e) {
    e.preventDefault();
    let val = this.state.inputVal;

    try {
      const count = parseInt(val, 10);
      if (isNaN(count) || count <= 0) {
        console.error('Invalid participant count.  If setting to 0, please cancel');
        return;
      }
      this.props.onSubmit(count);
    } catch (err) {
      console.error('Error submitting updated participant count', err);
    }
  }

  handleParticipantChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  render() {
    const label = this.props.isUpdating ? 'Saving...' : 'Save';
    const icon = this.props.isUpdating ? <CircularProgress className='saving-participants-progress' thickness={1.75} /> : <People color='#fff' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Participant Count</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitPartipantCount}>
            <FieldGroup
              autoFocus
              id='participant-count-id'
              type='text'
              placeholder='5'
              value={this.state.inputVal}
              onChange={this.handleParticipantChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
        <RaisedButton
          disabled={this.props.isUpdating}
          labelColor='#fff'
          label={label}
          backgroundColor='#52B266'
          icon={icon}
          onTouchTap={this.submitPartipantCount}
        />
        </Modal.Footer>
      </Modal>
    );
  }
};

export default EditParticipantsModal;