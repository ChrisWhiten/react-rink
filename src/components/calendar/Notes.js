import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import Block from 'material-ui/svg-icons/content/block';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress from 'material-ui/CircularProgress';
import Note from '../booking/Note';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';
import DateAndTimeSection from './DateAndTimeSection';
import './styles/Notes.css';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
    </FormGroup>
  );
}

function getAvailableSlotCount(slot) {
  let availableSlotCount = slot.availabilitySlot.totalSlots;
    if (slot.availabilitySlot.bookings) {
      slot.availabilitySlot.bookings.forEach(b => {
        availableSlotCount -= b.slotCount;
      });
    }

    if (slot.availabilitySlot.blocks) {
      slot.availabilitySlot.blocks.forEach(b => {
        availableSlotCount -= b.slotCount;
      });
    }

    return availableSlotCount;
}

class Notes extends React.Component {
  renderNotesSection(bookings) {
    let notes = {};

    bookings.map(b => {
      // if (b.notes && b.notes.length > 0) {
      if (true) {
        const name = `${b.leaderFirstName} ${b.leaderLastName}`;
        notes[name] = b.notes || [];
      }
      return null;
    });

    return (
      <div className='summary-form-notes-section'>
        {Object.keys(notes).map(name => {
          return (
            <div className='summary-form-item-notes' key={`summary-form-item-notes-${name}`}>
              <div className='notes-name-header' key={`notes-name-header-${name}`}>
                <h4 className='notes-name'>
                  {name}
                </h4>
              </div>
              <div className='notes-list' key={`notes-list-${name}`}>
                {notes[name].map(note => {
                  return <Note note={note} key={note.noteId} />
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (!this.props.slot || !this.props.slot.availabilitySlot) {
      return null;
    }

    let availableSlotCount = getAvailableSlotCount(this.props.slot);

    return (
      <div className='block-off-form'>
        <div className='block-off-form-header'>
          <div className='block-off-form-header-close invisible'>
            <Close className='block-off-form-close-icon' />
          </div>
          <div className='block-off-form-header-title'>
            Notes
          </div>
          <div className='block-off-form-header-close' onClick={this.props.onRequestClose}>
            <Close className='block-off-form-close-icon' />
          </div>
        </div>
        <div className='block-off-form-content'>
          <div>
            <DateAndTimeSection location={this.props.location} slotCount={0} time={this.props.slot.time} />
            { this.renderNotesSection(this.props.bookings) }
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
