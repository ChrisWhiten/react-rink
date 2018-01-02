import React, {PropTypes} from 'react';
import {Elements} from 'react-stripe-elements';
import Close from 'material-ui/svg-icons/navigation/close';
import './styles/BookingForm.css';
import CheckoutForm from './CheckoutForm';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.payLater = this.payLater.bind(this);
  }

  payLater(booking) {
    console.error('pay later!', booking);
    this.props.createBooking(booking, (createdBooking) => {
      console.log('booking created!', createdBooking);
    });
  }

  _onClose() {
    this.props.onRequestClose();
  }

  render() {

    return (
      <div className='booking-form'>
        <div className='booking-form-header'>
          <div className='booking-form-header-close invisible'>
            <Close className='booking-form-close-icon' />
          </div>
          <div className='booking-form-header-title'>
            New Booking
          </div>
          <div className='booking-form-header-close' onTouchTap={this.props.onRequestClose}>
            <Close className='booking-form-close-icon' />
          </div>
        </div>
        <div className='booking-form-content'>
          <Elements>
            <CheckoutForm booking={this.props.booking} location={this.props.location} payLater={this.payLater} />
          </Elements>
        </div>
      </div>
    );
  }
}

BookingForm.propTypes = {
  booking: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default BookingForm;
