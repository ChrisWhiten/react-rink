import React from 'react';
import PropTypes from 'prop-types';
import BookingForm from './BookingForm';
import BlockOff from './BlockOff';
import BookingCard from './BookingCard';
import BlockCard from './BlockCard';
import Note from '../booking/Note';
import Close from 'material-ui/svg-icons/navigation/close';
import NoteAdd from 'material-ui/svg-icons/content/add-box';
import Block from 'material-ui/svg-icons/content/block';
import Pencil from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';

import './styles/BookingSummaryForm.css';

class BookingSummaryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newBooking: false,
    };

    this.newBooking = this.newBooking.bind(this);
    this.cancelNewBooking = this.cancelNewBooking.bind(this);
    this.blockOff = this.blockOff.bind(this);
    this.cancelBlockOff = this.cancelBlockOff.bind(this);
  }

  blockOff() {
    this.setState({
      blockOff: true,
    });
  }

  cancelBlockOff() {
    this.setState({
      blockOff: false,
    });
  }

  cancelNewBooking() {
    this.setState({
      newBooking: false,
    });
  }

  newBooking() {
    this.setState({
      newBooking: true,
    });
    // this.props.requestNewBooking(this.props.booking, this.props.location.locationName, this.props.location.locationId);
  }

  renderNewBooking() {
    return <div className='summary-box new-booking' onClick={this.newBooking}>
      <div className='new-booking-text'><h4>Add Booking</h4></div>
      <NoteAdd className='new-booking-icon' />
    </div>
  }

  renderBlockBooking() {
    return <div className='summary-box block-off' onClick={this.blockOff}>
      <div className='new-booking-text'><h4>Block off</h4></div>
      <Block className='new-booking-icon' />
    </div>
  }

  renderActionsSection() {
    return <div className='summary-form-actions-section'>
      <div className='summary-action-button'>
        <RaisedButton
          onClick={this.blockOff}
          labelColor='#fff'
          label="Block off Time Slots"
          backgroundColor='#f54'
          icon={<Block color='#fff' />}
        />
      </div>
      <div className='summary-action-button'>
        <RaisedButton
          // onClick={this.showAddNoteModal}
          labelColor='#fff'
          label="Add Note"
          backgroundColor='#0088cc'
          icon={<Pencil color='#fff' />}
        />
      </div>
    </div>
  }

  renderNotesSection(bookings) {
    let notes = {};

    bookings.map(b => {
      if (b.notes && b.notes.length > 0) {
        const name = `${b.leaderFirstName} ${b.leaderLastName}`;
        notes[name] = b.notes;
      }
      return null;
    });

    if (Object.keys(notes).length === 0) {
      return null;
    }

    return (
      <div className='summary-form-notes-section'>
        {Object.keys(notes).map(name => {
          return (
            <div className='summary-form-item-notes' key={`summary-form-item-notes-${name}`}>
              <div className='notes-name-header' key={`notes-name-header-${name}`}>
                <h4 className='notes-name'>
                  {name} Notes
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
    if (!this.props.booking || !this.props.booking.availabilitySlot) {
      return null;
    }

    const bookings = this.props.booking.availabilitySlot.bookings || [];
    const blocks = this.props.booking.availabilitySlot.blocks || [];

    if (this.state.newBooking) {
      return (
        <BookingForm
          location={this.props.location}
          slot={this.props.booking}
          onRequestClose={this.cancelNewBooking}
          onBookingCreated={this.cancelNewBooking}
          createBooking={this.props.createBooking}
        />
      )
    }

    if (this.state.blockOff) {
      return (
        <BlockOff
          location={this.props.location}
          locations={this.props.locations}
          slot={this.props.booking}
          onRequestClose={this.cancelBlockOff}
          createBlock={this.props.createBlock}
        />
      )
    }

    return (
      <div className='booking-form'>
        <div className='booking-form-header'>
          <div className='booking-form-header-close invisible'>
            <Close className='booking-form-close-icon' />
          </div>
          <div className='booking-form-header-title'>
            Booking Summary
          </div>
          <div className='booking-form-header-close' onClick={this.props.onRequestClose}>
            <Close className='booking-form-close-icon' />
          </div>
        </div>
        <div className='summary-content'>
          { this.renderNewBooking() }
          {/* { this.renderBlockBooking() } */}
          {
            bookings.map(b => {
              return <BookingCard router={this.props.router} key={b.id} booking={b} updateBooking={this.props.updateBooking} />;
            })
          }
          {
            blocks.map(b => {
              return <BlockCard key={b.id} block={b} deleteBlock={this.props.deleteBlock} />;
            })
          }
          { this.renderActionsSection() }
          { this.renderNotesSection(bookings) }
        </div>
      </div>
    );
  }
}

BookingSummaryForm.propTypes = {
  slot: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default BookingSummaryForm;
