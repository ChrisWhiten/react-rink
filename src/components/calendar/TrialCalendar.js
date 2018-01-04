import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import BookingPanel from './BookingPanel';
import SlideUp from './SlideUp';
import BookingForm from './BookingForm';
import BookingSummaryForm from './BookingSummaryForm';
import CheckIn from './CheckIn';
import CircularProgress from 'material-ui/CircularProgress';
import People from 'material-ui/svg-icons/social/people';
import classNames from 'classnames';
import './styles/TrialCalendar.css';

class AvailabilityList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
      screenWidth: 0,
      screenHeight: 0,
      showBookingSlideup: false,
      showSlotSlideup: false,
    };

    this.itemWidth = '100%';
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.summarySlideupCancel = this.summarySlideupCancel.bind(this);
    this.openNewBookingForm = this.openNewBookingForm.bind(this);
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

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
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

  openNewBookingForm(b, locationName, locationId) {
    this.setState({
      selectedBooking: b,
      selectedLocation: {
        locationName,
        locationId,
      },
      showBookingSlideup: true,
    });
  }

  _handleOpen(b, locationName, locationId) {
    const newState = {
      selectedBooking: b,
      selectedLocation: {
        locationName,
        locationId,
      },
    };

    if (b.availabilitySlot.bookings && b.availabilitySlot.bookings.length > 0) {
      newState.showSlotSlideup = true;
    } else {
      newState.showBookingSlideup = true;
    }

    this.setState(newState);
  }

  _handleClose() {
    this.setState({
      open: false,
    });
  }

  _renderAvailabilitySlot(slot, locationName, locationId) {
    const bookings = slot.availabilitySlot.bookings || [];
    bookings.sort((a, b) => {
      return b.slotCount - a.slotCount;
    });

    let availableCount = slot.availabilitySlot.totalSlots;
    let totalBookingCount = 0;
    bookings.forEach(b => {
      availableCount -= b.slotCount;
      totalBookingCount += b.slotCount;
    });

    const slotClass = classNames(
      'booking-slot',
      'sixty-mins', {
        unbooked: totalBookingCount === 0
      }, {
        booked: totalBookingCount !== 0
      },
    );

    return (
      <div className={slotClass} id={slot.id} onTouchTap={this._handleOpen.bind(this, slot, locationName, locationId)}>
        <div className='slot-details'>
          <span className='slot-time'>
            {moment(slot.availabilitySlot.startTime).format('LT')} - {moment(slot.availabilitySlot.startTime).add(slot.availabilitySlot.duration, 'minutes').format('LT')}
          </span>
          <h3>{ availableCount } Available</h3>
          <div className='slot-booking-list'>
          {/* {
            bookings.map(b => {
              return <div className='slot-booker'>
                {b.slotCount} <People className='slot-booker-icon' /> ({b.leaderName})
              </div>
            })
          } */}
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
                    return (<td className='open-spot' key={`open-spot-${locationIdx}-${idx}`}>
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
    const { bookings } = this.props;

    let foo = {
      padding: 0,
      margin: 0,
      maxWidth: '450px',
    };

    let baz = {
      maxWidth: '450px',
    };

    if (bookings.isFetching) {
      return (
        <div style={{position: 'relative', width: '100%'}}>
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        </div>
      );
    }

    const locationCount = bookings.items.length || 1; // don't divide by 0
    this.itemWidth = `${100/locationCount}%`;

    const locationsTableWidth = `${this.state.screenWidth - 72}px`;

    return (
      <div className='trial-calendar'>
        <div className='calendar-container'>
          <div className='times-slider'>
            { this._renderTimesTable() }
          </div>
          <div className='locations-wrapper' width={locationsTableWidth}>
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
            <table className='scrolling-table' width={locationsTableWidth}>
              { this._renderCalendarItems(this.props.bookings.items) }
            </table>
          </div>
        </div>

        <Dialog
          className='booking-dialog'
          bodyStyle={foo}
          contentStyle={baz}
          modal={true}
          open={this.state.open}
          onRequestClose={this._handleClose.bind(this)}
        >
          <BookingPanel booking={this.state.selectedBooking} onRequestClose={this._handleClose.bind(this)} />
        </Dialog>

        <SlideUp
          screenHeight={this.state.screenHeight}
          active={this.state.showBookingSlideup}
          onCancel={this._slideupCancel.bind(this)}
          zIndex={7}
        >
          <BookingForm
            location={this.state.selectedLocation}
            booking={this.state.selectedBooking}
            onRequestClose={this._slideupCancel.bind(this)}
            createBooking={this.props.createBooking}
          />
        </SlideUp>
        <SlideUp
          screenHeight={this.state.screenHeight}
          active={this.state.showSlotSlideup}
          onCancel={this._slideupCancel.bind(this)}
        >
          <BookingSummaryForm
            location={this.state.selectedLocation}
            booking={this.state.selectedBooking}
            onRequestClose={this.summarySlideupCancel}
            requestNewBooking={this.openNewBookingForm}
            createBooking={this.props.createBooking}
          />
        </SlideUp>
        <CheckIn />
      </div>
    );
  }
}

AvailabilityList.propTypes = {
  bookings: PropTypes.object,
};

export default AvailabilityList;
