import React from 'react';
import BookingCard from './BookingCard';
import Close from 'material-ui/svg-icons/navigation/close';
import NoteAdd from 'material-ui/svg-icons/content/add-box';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import BookingForm from './BookingForm';
import classNames from 'classnames';
import moment from 'moment';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import './styles/CheckinForm.css';

class CheckInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      newBookingLocation: null,
      showBookingSlideup: false,
      newBookingTimeslot: null,
    };

    this.newBooking = this.newBooking.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTimeslotChange = this.handleTimeslotChange.bind(this);
    this.confirmSelectedTimeAndPlace = this.confirmSelectedTimeAndPlace.bind(this);
    this.cancelAddNewBooking = this.cancelAddNewBooking.bind(this);
    this.cancelBookingSlideup = this.cancelBookingSlideup.bind(this);
    this.createNewBooking = this.createNewBooking.bind(this);
    this.onBookingCreated = this.onBookingCreated.bind(this);
    this.summarySlideupCancel = this.summarySlideupCancel.bind(this);
  }

  summarySlideupCancel() {
    this.setState({
      showBookingSlideup: false,
      stage: 0,
    });
  }

  onBookingCreated() {
    console.error('booking created!!!');
    this.setState({
      showBookingSlideup: false,
      stage: 0,
    });
  }

  createNewBooking(newBooking, slot, cb) {
    this.props.createSlot(slot.availabilitySlot, (err, newSlot) => {

      this.props.createBooking(newBooking, newSlot, (createBookingError, createdBooking) => {
        console.log('created booking!', createdBooking);
        if (createBookingError) {
          console.error('but an error was thrown!', createBookingError);
        }

        cb(createdBooking);
      });
    });
  }

  cancelBookingSlideup() {
    this.setState({
      showBookingSlideup: false,
      stage: 0,
    });
  }

  cancelAddNewBooking() {
    this.setState({
      newBookingLocation: null,
      stage: 0,
    });
  }

  confirmSelectedTimeAndPlace() {
    if (this.state.newBookingLocation && this.state.newBookingLocation !== 'select-location') {
      this.setState({
        stage: 2,
        showBookingSlideup: true,
      });
    }
  }

  handleTimeslotChange(e) {
    const selection = e.target.value;
    if (selection === 'select-timeslot') return;

    let slot;

    // search
    // this is dumb, but i am lazy right now.
    let found = false;
    for (let i = 0; i < this.props.walkins.items.length; i++) {
      for (let j = 0; j < this.props.walkins.items[i].bookings.length; j++) {
        if (this.props.walkins.items[i].bookings[j].id === selection) {
          slot = this.props.walkins.items[i].bookings[j];
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }

    if (!slot.availabilitySlot) {
      slot.availabilitySlot = {
        startTime: new Date(slot.time).getTime(),
        totalSlots: 20, // TODO: configurable?
        duration: 60, // TODO: configurable?
        isPublic: true,
        locationId: this.state.newBookingLocation,
      };
    }

    this.setState({
      newBookingTimeslot: slot,
    });
  }

  handleLocationChange(e) {
    const selection = e.target.value;
    if (selection === 'select-location') return;

    this.setState({
      newBookingLocation: selection,
      newBookingTimeslot: null,
    });
  }

  newBooking() {
    // the below is for once we've picked a location/time i guess?
    // this.props.requestNewBooking(this.props.booking, this.props.location.locationName, this.props.location.locationId);
    this.setState({
      stage: 1,
    });
  }

  renderLocationOptions(locations) {
    let options = [];
    locations.forEach(l => {
      options.push(<option key={`new-booking-key-${l.id}`} value={l.id}>{l.locationName}</option>);
    });
    return options;
  }

  renderTimeslotOptions(slots) {
    let options = [];
    slots.forEach(s => {
      options.push(<option key={`new-booking-slot-key-${s.id}`} value={s.id}>{moment(s.time).format('LT')}</option>);
    });
    console.warn('slots', slots);
    return options;
  }

  renderNewBooking() {
    switch (this.state.stage) {
      case 0:
        return <div className='summary-box new-booking' onClick={this.newBooking}>
          <div className='new-booking-text'><h4>Add Booking</h4></div>
          <NoteAdd className='new-booking-icon' />
        </div>;
      case 1:
        const selectText = (!this.props.locations || this.props.locations.isFetching) ? 'Fetching locations...' : 'Select location';
        const timeslotSelectText = (!this.props.walkins || this.props.walkins.isFetching) ? 'Fetching timeslots...' : 'Select a timeslot';
        const locations = this.props.locations ? this.props.locations.items : [];
        let walkinIdx = 0;
        if (this.state.newBookingLocation) {
          for (let i = 0; i < this.props.locations.items.length; i++) {
            if (this.state.newBookingLocation === this.props.locations.items[i].id) {
              walkinIdx = i;
              break;
            }
          }
        }

        const slots = this.props.walkins.items[walkinIdx] ? this.props.walkins.items[walkinIdx].bookings : [];
        return <div className='summary-box new-booking stage-1'>
          <FormGroup controlId='formControlsSelect' className='new-booking-location-selector'>
            <FormControl componentClass='select' onChange={this.handleLocationChange}>
              <option value='select-location'>{selectText}</option>
              { this.renderLocationOptions(locations) }
            </FormControl>
          </FormGroup>

          {
            this.state.newBookingLocation &&
            <FormGroup controlId='formControlsSelect' className='new-booking-timeslot-selector'>
              <FormControl componentClass='select' onChange={this.handleTimeslotChange}>
                <option value='select-timeslot'>{timeslotSelectText}</option>
                { this.renderTimeslotOptions(slots) }
              </FormControl>
            </FormGroup>
          }

          <div className='actions'>
            <RaisedButton
              onClick={this.confirmSelectedTimeAndPlace}
              disabled={!this.state.newBookingLocation || !this.state.newBookingTimeslot}
              labelColor='#fff'
              label="OK"
              backgroundColor='#52B266'
              className='new-booking-ok-button'
            />
            <RaisedButton
              labelColor='#fff'
              backgroundColor='#f54'
              onClick={this.cancelAddNewBooking}
              label='Cancel'
            />
          </div>
        </div>;
      default:
        return null;
    }

  }

  render() {
    let bookings = [];
    if (this.props.walkins.items) {
      this.props.walkins.items.forEach(location => {

        location.bookings
          .filter(s => s.availabilitySlot && s.availabilitySlot.bookings)
          .map(slot => bookings = bookings.concat(slot.availabilitySlot.bookings));
      });
    }

    // locationId
    let locationObj = null;
    if (this.state.newBookingLocation) {
      locationObj = this.props.locations.items.filter(l => l.id === this.state.newBookingLocation)[0];
    }

    if (locationObj) {
      locationObj.locationId = locationObj.id; // TODO: go out and clean these references up at some point soon
    }

    const loadingClass = classNames(
      'loading-walkins',
      {
        active: this.props.walkins.isFetching,
      },
    );

    if (this.state.showBookingSlideup) {
      return (
        <BookingForm
          location={locationObj}
          slot={this.state.newBookingTimeslot}
          onRequestClose={this.summarySlideupCancel}
          onBookingCreated={this.summarySlideupCancel}
          createBooking={this.createNewBooking}
        />
      );
    }

    return (
      <div className='checkin-form'>
        <div className='checkin-form-header'>
          <div className='checkin-form-header-close invisible'>
            <Close className='checkin-form-close-icon' />
          </div>
          <div className='checkin-form-header-title'>
            Walk-in
          </div>
          <div className='checkin-form-header-close' onClick={this.props.onRequestClose}>
            <Close className='checkin-form-close-icon' />
          </div>
        </div>
        <div className='summary-content'>
          { this.renderNewBooking() }
          {
            bookings.map(b => {
              return <BookingCard router={this.props.router} key={b.id} booking={b} updateBooking={this.props.updateBooking} />;
            })
          }
        </div>
        <div className={loadingClass}>
          <CircularProgress size={20} thickness={1.75} color='white' />
          <h5 className='loading-text'>Fetching nearby bookings...</h5>
        </div>
      </div>
    );
  }
}

CheckInForm.propTypes = {
};

export default CheckInForm;