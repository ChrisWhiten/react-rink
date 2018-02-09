import React, { Component } from 'react';
import Pencil from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';

import './styles/AddNoteModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AddNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
    };

    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }

  submitNote(e) {
    e.preventDefault();

    try {
      this.props.onSubmit(this.state.inputVal);
    } catch (err) {
      console.error('Error submitting note', err);
    }
  }

  handleNoteChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  render() {
    const label = this.props.isUpdating ? 'Processing...' : 'Add note';
    const icon = this.props.isUpdating ? <CircularProgress className='processing-note-progress' thickness={1.75} /> : <Pencil color='#fff' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitNote}>
            <FieldGroup
              autoFocus
              id='note-id'
              type='text'
              placeholder='Type your note here'
              onChange={this.handleNoteChange}
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
          onClick={this.submitNote}
        />
        </Modal.Footer>
      </Modal>
    );
  }
};

export default AddNoteModal;