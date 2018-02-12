import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import Note from '../booking/Note';
import DateAndTimeSection from './DateAndTimeSection';
import './styles/Notes.css';

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
