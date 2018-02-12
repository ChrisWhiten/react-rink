import React from 'react';
import PropTypes from 'prop-types';
import BookingForm from './BookingForm';
import BlockOff from './BlockOff';
import BookingCard from './BookingCard';
import BlockCard from './BlockCard';
import Notes from './Notes';
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
      blockOff: false,
      notesMode: false,
    };

    this.newBooking = this.newBooking.bind(this);
    this.cancelNewBooking = this.cancelNewBooking.bind(this);
    this.blockOff = this.blockOff.bind(this);
    this.cancelBlockOff = this.cancelBlockOff.bind(this);
    this.showNotes = this.showNotes.bind(this);
    this.hideNotes = this.hideNotes.bind(this);
  }

  showNotes() {
    this.setState({
      notesMode: true,
    });
  }

  hideNotes() {
    this.setState({
      notesMode: false,
    });
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

  renderActionsSection(bookings) {
    const noteCount = bookings.reduce((count, booking) => {
      return count + booking.notes.length;
    }, 0);

    const noteLabel = noteCount > 0 ? `Notes (${noteCount})` : 'Notes';

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
          onClick={this.showNotes}
          labelColor='#fff'
          label={noteLabel}
          backgroundColor='#0088cc'
          icon={<Pencil color='#fff' />}
        />
      </div>
    </div>
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
      );
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
      );
    }

    if (this.state.notesMode) {
      return (
        <Notes
          bookings={bookings}
          onRequestClose={this.hideNotes}
          location={this.props.location}
          slot={this.props.booking}
        />
      );
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
              return <BlockCard slot={this.props.booking} key={b.id} block={b} deleteBlock={this.props.deleteBlock} />;
            })
          }
          { this.renderActionsSection(bookings) }
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
