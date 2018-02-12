import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BookingSummaryForm from './BookingSummaryForm';
import CheckIn from './CheckIn';
import NewSlotModal from './NewSlotModal';
import CircularProgress from 'material-ui/CircularProgress';
import People from 'material-ui/svg-icons/social/people';
import classNames from 'classnames';
import {
  Modal,
} from 'react-bootstrap';
import './styles/TrialCalendar.css';

class AvailabilityList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedSlot: null,
      screenWidth: 0,
      screenHeight: 0,
      showBookingSlideup: false,
      showSlotSlideup: false,
      creatingSlot: false,
      showCreateSlotModal: false,
    };

    this.itemWidth = '100%';
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.summarySlideupCancel = this.summarySlideupCancel.bind(this);
    this.openNewBookingForm = this.openNewBookingForm.bind(this);
    this.onBookingCreated = this.onBookingCreated.bind(this);
    this.createNewSlotPrompt = this.createNewSlotPrompt.bind(this);
    this.hideCreateSlotModal = this.hideCreateSlotModal.bind(this);
    this.createNewSlot = this.createNewSlot.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState) {
    // scroll the earliest slot into view on data load
    if (prevProps.bookings && prevProps.bookings.isFetching && !this.props.bookings.isFetching) {
      let earliest = new Date(2100, 0, 0);
      let earliestId;
      this.props.bookings.items.forEach(location => {
        for (let i = 0; i < location.bookings.length; i++) {
          if (location.bookings[i].availabilitySlot) {
            if (location.bookings[i].time < earliest) {
              earliest = location.bookings[i].time;
              earliestId = location.bookings[i].id;
            }
            break;
          }
        }
      });

      if (earliestId) {
        const slot = document.getElementById(earliestId);
        slot.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  }

  createNewSlot(slot) {
    this.setState({
      creatingSlot: true,
    });

    this.props.createSlot(slot, (createSlot) => {
      this.setState({
        showCreateSlotModal: false,
        creatingSlot: false,
      });
    });
  }

  hideCreateSlotModal() {
    this.setState({
      showCreateSlotModal: false,
    });
  }

  createNewSlotPrompt(locationId, slot, e) {
    if (slot.availabilitySlot) return;

    this.setState({
      showCreateSlotModal: true,
      createSlotCandidate: slot,
      createSlotLocationId: locationId,
    });
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  onBookingCreated(newBooking, slot) {
    this.setState({
      showBookingSlideup: false,
      showSlotSlideup: false,
      // selectedLocation: {
      //   locationName: newBooking.locationName,
      //   locationId: newBooking.locationId,
      // },
    });
  }

  summarySlideupCancel() {
    this.setState({
      showSlotSlideup: false,
    });
  }

  _slideupCancel() {
    this.setState({
      showBookingSlideup: false,
    });
  }

  openNewBookingForm(slot, locationName, locationId) {
    this.setState({
      selectedSlot: slot,
      selectedLocation: {
        locationName,
        locationId,
      },
      showBookingSlideup: true,
    });
  }

  _handleOpen(slot, locationName, locationId) {
    const newState = {
      selectedSlot: slot,
      selectedLocation: {
        locationName,
        locationId,
      },
    };

    // if (slot.availabilitySlot.bookings && slot.availabilitySlot.bookings.length > 0) {
    //   newState.showSlotSlideup = true;
    // } else {
    //   newState.showBookingSlideup = true;
    // }
    newState.showSlotSlideup = true;

    this.setState(newState);
  }

  _handleClose() {
    this.setState({
      open: false,
    });
  }

  _renderAvailabilitySlot(slot, locationName, locationId) {
    const bookings = slot.availabilitySlot.bookings ? slot.availabilitySlot.bookings.filter(b => !b.isCancelled) : [];
    const blocks = slot.availabilitySlot.blocks ? slot.availabilitySlot.blocks : [];
    bookings.sort((a, b) => {
      return b.slotCount - a.slotCount;
    });

    let availableCount = slot.availabilitySlot.totalSlots;
    let totalBookingCount = 0;
    bookings.forEach(b => {
      availableCount -= b.slotCount;
      totalBookingCount += b.slotCount;
    });

    blocks.forEach(b => {
      availableCount -= b.slotCount;
    });

    const slotClass = classNames(
      'booking-slot',
      'sixty-mins',
      {
        unbooked: totalBookingCount === 0,
      },
      {
        booked: totalBookingCount !== 0 && totalBookingCount < slot.availabilitySlot.totalSlots,
      },
      {
        full: totalBookingCount >= slot.availabilitySlot.totalSlots,
      }
    );

    return (
      <div className={slotClass} id={slot.id} onClick={this._handleOpen.bind(this, slot, locationName, locationId)}>
        <div className='slot-details'>
          <span className='slot-time'>
            {moment(slot.availabilitySlot.startTime).format('LT')} - {moment(slot.availabilitySlot.startTime).add(slot.availabilitySlot.duration, 'minutes').format('LT')}
          </span>
          <h3>{ availableCount } Available</h3>
          <div className='slot-booking-list'>
          {
            bookings.length === 1 &&
            <div className='slot-booker'>
              {bookings[0].leaderFirstName} {bookings[0].leaderLastName} ({bookings[0].slotCount} <People className='slot-booker-icon' />)
            </div>
          }
          {
            bookings.length > 1 &&
            <div className='slot-booker'>
              {bookings.length} bookings ({totalBookingCount} <People className='slot-booker-icon' />)
            </div>
          }
          </div>
        </div>
      </div>
    );
  }

  // this nesting structure is a bit un-intuitive,
  // fix up later
  _renderCalendarItems(bookings) {
    if (bookings.length < 1) return null;
    return (
      <tbody>
        <tr>
          {
            Object.keys(bookings).map(locationId => {
              return (<th className='filler-slot' width={this.itemWidth} key={`filler-slot-${locationId}`}>
              </th>)
            })
          }
        </tr>
        {
          Object.keys(bookings[0].bookings).map(idx => {
            return (
              <tr key={`${bookings[0].bookings[idx].id}_id`}>
                {
                  Object.keys(bookings).map(locationIdx => {
                    return (<td className='open-spot' key={`open-spot-${locationIdx}-${idx}`} onClick={this.createNewSlotPrompt.bind(this, bookings[locationIdx].locationID, bookings[locationIdx].bookings[idx])}>
                      <div className='open-spot-time-label'>
                        <span>{moment(bookings[locationIdx].bookings[idx].time).format('LT')}</span>
                      </div>

                      {
                        bookings[locationIdx].bookings[idx].availabilitySlot &&
                        this._renderAvailabilitySlot(bookings[locationIdx].bookings[idx], bookings[locationIdx].locationName, bookings[locationIdx].locationID)
                      }
                  </td>)
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    );
  }

  _renderTimeRow(hour, meridian, minutes) {
    return (
      <tr key={`tr-${hour}-${minutes}-${meridian}`}>
        <td className='time-container'>
          {
            minutes === '00' &&
            <div className='time-hour'>
              <span className='hour-text'>{hour}</span>
              <span className='ampm-text'>{meridian}</span>
            </div>
          }

          <div className='time-minutes'>{minutes}</div>
        </td>
      </tr>
    );
  }

  _renderTimesTable() {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const pieces = ['00', '15', '30', '45'];
    const slots = [];

    // am
    hours.forEach(h => {
      pieces.forEach(p => {
        slots.push({
          hour: h,
          minutes: p,
          meridian: 'am',
        });
      });
    });

    // pm
    hours.forEach(h => {
      pieces.forEach(p => {
        slots.push({
          hour: h,
          minutes: p,
          meridian: 'pm',
        });
      });
    });

    return (
      <table className='times-table'>
        <tbody>
          {
            slots.map(s => {
              return this._renderTimeRow(s.hour, s.meridian, s.minutes);
            })
          }
        </tbody>
      </table>
    );
  }

  render() {
    const bookings = Object.assign({}, this.props.bookings);
    const isFetching = bookings.isFetching;

    if (Array.isArray(this.props.filteredLocationList) && this.props.filteredLocationList.length > 0) {
      const ids = this.props.filteredLocationList.map(l => l.locationId);
      bookings.items = bookings.items.filter(location => {
        return (ids.indexOf(location.locationID) > -1);
      });
    }

    const locationCount = bookings.items.length || 1; // don't divide by 0
    this.itemWidth = `${100/locationCount}%`;

    const locationsTableWidth = `${this.state.screenWidth - 72}px`;

    const locationsWrapperClass = classNames(
      'locations-wrapper', {
        headless: !!this.props.headless,
      },
    );

    const calendarContainerClass = classNames(
      'calendar-container', {
        headless: !!this.props.headless,
      },
    );

    // TODO: this is probably only useful if we don't use a modal...
    const slideupActive = false;//this.state.showBookingSlideup || this.state.showSlotSlideup || (this.refs.checkIn && this.refs.checkIn.state.showCheckinSlideup);
    const tableClass = classNames(
      'scrolling-table', {
        'slideup-active': slideupActive,
      },
    );

    return (
      <div className='trial-calendar'>
      {
        isFetching &&
        <div style={{position: 'relative', width: '100%', marginTop: '13em'}}>
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        </div>
      }
      {
        !isFetching &&
          <div className={calendarContainerClass}>
            <div className='times-slider'>
              { this._renderTimesTable() }
            </div>
            <div className={locationsWrapperClass} width={locationsTableWidth}>
              <table className='locations-table' width={locationsTableWidth}>
                <thead>
                  <tr>
                    {
                      bookings.items.map(location => {
                        return (
                          <th key={`location-header-${location.locationName}`} className='location-header' width={this.itemWidth}>
                            <h3 className='location-title'>{location.locationName}</h3>
                          </th>
                        )
                      })
                    }
                  </tr>
                </thead>
              </table>
            </div>
            <div className='calendar-section' width={locationsTableWidth}>
              <table className={tableClass} width={locationsTableWidth}>
                { this._renderCalendarItems(bookings.items) }
              </table>
            </div>
          </div>
      }
        <Modal
          dialogClassName='booking-summary-modal'
          show={this.state.showSlotSlideup}
          onHide={this._slideupCancel.bind(this)}
        >
          <BookingSummaryForm
            updateBooking={this.props.updateBooking}
            location={this.state.selectedLocation}
            locations={this.props.locations}
            booking={this.state.selectedSlot}
            onRequestClose={this.summarySlideupCancel}
            router={this.props.router}
            requestNewBooking={this.openNewBookingForm}
            createBooking={this.props.createBooking}
            createBlock={this.props.createBlock}
            deleteBlock={this.props.deleteBlock}
          />
        </Modal>
        <CheckIn
          ref='checkIn'
          screenHeight={this.state.screenHeight}
          walkins={this.props.walkins}
          updateBooking={this.props.updateBooking}
          router={this.props.router}
          locations={this.props.locations}
          createSlot={this.props.createSlot}
          createBooking={this.props.createBooking}
          fetchWalkins={this.props.fetchWalkins}
        />
        <NewSlotModal
          isUpdating={this.state.creatingSlot}
          onSubmit={this.createNewSlot}
          decline={this.hideCreateSlotModal}
          show={this.state.showCreateSlotModal}
          hide={this.hideCreateSlotModal}
          createSlotCandidate={this.state.createSlotCandidate}
          createSlotLocationId={this.state.createSlotLocationId}
        />
      </div>
    );
  }
}

AvailabilityList.propTypes = {
  bookings: PropTypes.object,
};

export default AvailabilityList;
