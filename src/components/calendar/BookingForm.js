import React, {PropTypes} from 'react';
import {Elements} from 'react-stripe-elements';
import Close from 'material-ui/svg-icons/navigation/close';
import './styles/BookingForm.css';
import CheckoutForm from './CheckoutForm';

class BookingForm extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      selectedBooking: null,
    };
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
            <CheckoutForm />
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
