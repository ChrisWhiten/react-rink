import React from 'react';
import PropTypes from 'prop-types';
import BookingCard from './BookingCard';
import Close from 'material-ui/svg-icons/navigation/close';
import NoteAdd from 'material-ui/svg-icons/content/add-box';

import './styles/BookingSummaryForm.css';

class BookingSummaryForm extends React.Component {
  constructor(props) {
    super(props);

    this.newBooking = this.newBooking.bind(this);
  }

  newBooking() {
    this.props.requestNewBooking(this.props.booking, this.props.location.locationName, this.props.location.locationId);
  }

  renderNewBooking() {
    return <div className='summary-box new-booking' onClick={this.newBooking}>
      <div className='new-booking-text'><h4>Add Booking</h4></div>
      <NoteAdd className='new-booking-icon' />
    </div>
  }

  render() {
    if (!this.props.booking || !this.props.booking.availabilitySlot || !this.props.booking.availabilitySlot.bookings) {
      return null;
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
          {
            this.props.booking.availabilitySlot.bookings.map(b => {
              return <BookingCard router={this.props.router} key={b.id} booking={b} updateBooking={this.props.updateBooking} />;
            })
          }
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
