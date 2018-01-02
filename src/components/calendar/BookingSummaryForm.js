import React, {PropTypes} from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import moment from 'moment';

import './styles/BookingSummaryForm.css';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

  }

  _onClose() {
    this.props.onRequestClose();
  }

  renderNewBooking() {
    return <div className='summary-box new-booking'>
      New booking
    </div>
  }
  renderBooking(b) {
    return (
      <div className='summary-box existing-booking' key={`booking-${b.id}`}>
        <div className='paid-section'>
          {
            b.bookingCost > b.paidAmount &&
            <div className='owed'>
              Owes: ${(b.bookingCost - b.paidAmount).toFixed(2)}
            </div>
          }
          {
            b.bookingCost <= b.paidAmount &&
            <div className='paid'>
              Paid
            </div>
          }
        </div>

        <div className='title-section'>
          <div className='title'>
            {b.leaderFirstName} {b.leaderLastName}
          </div>
          <div className='subtitle'>
          {b.locationName} @ {moment(b.start).format('LT')}
          </div>
        </div>

        <div className='checkin-section'>
          0/{b.slotCount}
        </div>

      </div>
    );
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
          <div className='booking-form-header-close' onTouchTap={this.props.onRequestClose}>
            <Close className='booking-form-close-icon' />
          </div>
        </div>
        <div className='summary-content'>
          { this.renderNewBooking() }
          {
            this.props.booking.availabilitySlot.bookings.map(b => {
              return this.renderBooking(b)
            })
          }
        </div>
      </div>
    );
  }
}

BookingForm.propTypes = {
  slot: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default BookingForm;
