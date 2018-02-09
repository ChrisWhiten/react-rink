import moment from 'moment';
import PersonPinCircle from 'material-ui/svg-icons/maps/person-pin-circle';
import Close from 'material-ui/svg-icons/navigation/close';
import CheckinForm from './CheckinForm';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import './styles/CheckIn.css';

class CheckIn extends React.Component {
  constructor() {
    super();

    this.state = {
      showCheckinSlideup: false,
    };

    this.cancelCheckinSlideup = this.cancelCheckinSlideup.bind(this);
    this.toggleCheckin = this.toggleCheckin.bind(this);
  }

  cancelCheckinSlideup() {
    this.setState({
      showCheckinSlideup: false,
    });
  }

  toggleCheckin() {
    this.setState({
      showCheckinSlideup: !this.state.showCheckinSlideup,
    });

    // if checkin timeframe is too far away from current time, fetch new checkin data
    console.error(moment(new Date()).diff(moment(this.props.walkins.start)), new Date(), new Date(this.props.walkins.start));
    const HOUR_AND_A_HALF = 1000 * 60 * 60 * 1.5;
    console.log('hour and a half', HOUR_AND_A_HALF);
    if (moment(new Date()).diff(moment(this.props.walkins.start)) > HOUR_AND_A_HALF) {
      this.props.fetchWalkins();
    }
  }

  render() {
    const checkinText = this.state.showCheckinSlideup ? 'Close' : 'Walk-in';
    const checkinIcon = this.state.showCheckinSlideup ? <Close className='check-in-icon' /> : <PersonPinCircle className='check-in-icon' />;

    return (
      <div className='check-in-container'>
        <div className='check-in' onClick={this.toggleCheckin}>
          <div className='check-in-icon-container'>
            { checkinIcon }
          </div>
          <div className='check-in-text'>{checkinText}</div>
        </div>
        <Modal
          show={this.state.showCheckinSlideup}
          onHide={this.cancelCheckinSlideup}
          dialogClassName='checkin-form-modal'
        >
          <CheckinForm
            screenHeight={this.props.screenHeight}
            walkins={this.props.walkins}
            router={this.props.router}
            updateBooking={this.props.updateBooking}
            onRequestClose={this.toggleCheckin}
            // onBookingCreated={this.onBookingCreated}
            createBooking={this.props.createBooking}
            createSlot={this.props.createSlot}
            locations={this.props.locations}
          />
        </Modal>
      </div>
    );
  }
}

CheckIn.propTypes = {
  onRequestClose: PropTypes.func,
};

export default CheckIn;
