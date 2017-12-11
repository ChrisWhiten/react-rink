import React, {PropTypes} from 'react';
import './styles/BookingForm.css';

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
      <div className='booking-form' onTouchTap={this._onClose.bind(this)}>
        { JSON.stringify(this.props.booking) }
      </div>
    );
  }
}

BookingForm.propTypes = {
  booking: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default BookingForm;
