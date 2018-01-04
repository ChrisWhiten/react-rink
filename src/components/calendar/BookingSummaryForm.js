import React, {PropTypes} from 'react';
import CheckinCounter from './CheckinCounter';
import Close from 'material-ui/svg-icons/navigation/close';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import NoteAdd from 'material-ui/svg-icons/content/add-box';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Warning from 'material-ui/svg-icons/alert/warning';
import moment from 'moment';

import './styles/BookingSummaryForm.css';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.newBooking = this.newBooking.bind(this);
    this.updateCounter = this.updateCounter.bind(this);
  }

  updateCounter(booking, newValue) {
    console.error('should be updating', booking, ' to ', newValue);
  }

  newBooking() {
    this.props.requestNewBooking(this.props.booking, this.props.location.locationName, this.props.location.locationId);
  }

  renderNewBooking() {
    return <div className='summary-box new-booking' onTouchTap={this.newBooking}>
      <div className='new-booking-text'><h4>Add Booking</h4></div>
      <NoteAdd className='new-booking-icon' />
    </div>
  }

  renderBooking(b) {
    return (
      <div className='summary-box existing-booking' key={`booking-${b.id}`}>
        <div className='paid-section'>
          {
            b.bookingCost > b.paidAmount &&
            <div className='owed'>
              ${((b.bookingCost - b.paidAmount)/100).toFixed(2)} Owed
            </div>
          }
          {
            b.bookingCost <= b.paidAmount &&
            <div className='paid'>
              Paid
            </div>
          }
        </div>

        <div className='status-section'>
        {
          true &&
          <div className='completed'>
            <CheckCircle className='completed-circle' />
          </div>
        }
        {
          false &&
          <Warning className='warning-incomplete' />
        }
        </div>

        <div className='title-section'>
          <div className='title'>
            <h4>{b.leaderFirstName} {b.leaderLastName}</h4>
          </div>
          <div className='subtitle'>
            <h5>{b.locationName} @ {moment(b.start).format('LT')}</h5>
          </div>
        </div>

        <div className='img-section'>
          <AccountCircle className='user-no-img-avatar' />
        </div>
        <div className='checkin-section'>
          <CheckinCounter
            booking={b}
            updateCounter={this.updateCounter}
          />
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
