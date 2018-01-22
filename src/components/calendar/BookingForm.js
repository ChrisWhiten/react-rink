import React from 'react';
import PropTypes from 'prop-types';
import {Elements} from 'react-stripe-elements';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress from 'material-ui/CircularProgress';
import Close from 'material-ui/svg-icons/navigation/close';
import './styles/BookingForm.css';
import CheckoutForm from './CheckoutForm';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      created: false,
    };

    this.payLater = this.payLater.bind(this);
  }

  payLater(booking) {
    console.error('pay later!', booking);
    this.setState({
      creating: true,
    });

    this.props.createBooking(booking, this.props.slot, (err, createdBooking) => {
      console.log('booking created callback called!')
      if (err) {
        console.error('but there was an error!', err);
      }
      this.setState({
        creating: false,
        created: true,
      });

      setTimeout(() => {
        this.props.onBookingCreated(createdBooking);
        setTimeout(() => {
          this.setState({
            created: false,
          });
        }, 200);
      }, 500);
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
        {
          this.state.creating &&
          <div className='creation-container'>
            <div className='creation-status'><CircularProgress size={80} /></div>
            <h5 className='creation-text'>Booking...</h5>
          </div>
        }
        {
          !this.state.creating && this.state.created &&
          <div className='creation-container'>
            <div className='creation-status'><CheckCircle size={80} className='booking-completed-checkmark' /></div>
            <h5 className='creation-text'>Booking complete!</h5>
          </div>
        }
        {
          !this.state.creating && !this.state.created &&
          <div>
            {/* remove the above div once we bring back <Elemnets> */}
            {/* <Elements> */}
            <CheckoutForm booking={this.props.slot} location={this.props.location} payLater={this.payLater} />
            {/* </Elements> */}
          </div>
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
