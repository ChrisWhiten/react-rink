import React from 'react';
import PropTypes from 'prop-types';
import People from 'material-ui/svg-icons/social/people';
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment';
import classNames from 'classnames';

import SlideUp from '../calendar/SlideUp';
import BookingForm from '../calendar/BookingForm';
import BookingCompleted from './BookingCompleted';

import './ExternalList.css';

class ExternalList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedSlot: null,
      date: new Date(),
      screenWidth: 0,
      screenHeight: 0,
      showSlideup: false,
      createdBooking: undefined,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.checkout = this.checkout.bind(this);
    this.onBookingCreated = this.onBookingCreated.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && !this.props.isFetching) {
      this.props.loadMore();
    }
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  onBookingCreated(booking) {
    this.setState({
      showSlideup: false,
      createdBooking: booking,
    });

    console.error('here i should jump to a new congrats page')

    // force a new date to fetch fresh bookings
    // this.props.onDateChange(booking.start);
  }

  checkout(slot, locationName, locationId) {
    this.setState({
      showSlideup: true,
      selectedSlot: slot,
      selectedLocation: {
        locationName,
        locationId,
      },
    });
  }

  slideupCancel() {
    this.setState({
      showSlideup: false,
    });
  }

  renderSlot(slot, locationName, locationId) {
    let availabilities = slot.availabilitySlot.totalSlots;

    if (slot.availabilitySlot.bookings) {
      slot.availabilitySlot.bookings.map(b => {
        availabilities -= b.slotCount;
        return null;
      });
    }

    const slotClass = classNames(
      'external-slot',
      {
        full: availabilities === 0,
      },
      {
        available: availabilities > 0,
      },
    );

    return (
      <div className={slotClass} onTouchTap={this.checkout.bind(this, slot, locationName, locationId)} key={`slot-${new Date(slot.availabilitySlot.startTime).getTime()}`}>
        <div className='external-slot-time'>
          { moment(slot.availabilitySlot.startTime).format('LT') }
        </div>
        <div className='external-slot-availabilities'>
          { availabilities } <People className='external-slot-availaibilities-icon' />
        </div>
      </div>
    )
  }

  renderLegend() {
    return (
      <div className='legend'>
          <div className='legend-empty unavailable' />
          <div className='legend-text'>
          <h6>= Unavailable</h6>
          </div>
          <div className='legend-empty available' />
          <div className='legend-text'>
          <h6>= Available (click to book)</h6>
          </div>
      </div>
    );
  }

  renderByLocation(location, date) {
    const slots = location.bookings.filter(b => {
      return b.availabilitySlot;
    });

    return (
      <div className='container location-rendered' key={`location-rendered-${location.locationID}-${date}`}>
        <div className='location-metadata' key={`location-metadata-${location.locationID}-${date}`}>
          <h5>{location.locationName}</h5>
        </div>

        <hr className='external-separator' />

        <div className='location-bookings'>
          {
            slots.map(b => this.renderSlot(b, location.locationName, location.locationID))
          }
        </div>

        <hr className='external-separator' />

        { this.renderLegend() }
      </div>
    );
  }

  render() {
    const dates = this.props.bookings;
    console.error('oh no', this.props);
    const externalListClass = classNames(
      'external-list', {
        headless: !!this.props.headless,
      },
    );

    return (
      <div className={externalListClass}>
        {
          Object.keys(dates).map(d => {
            return <div key={`date-container-${d}`}>
              <div className='container external-date'>
                <h4>{ moment(d).format('dddd, MMMM Do, YYYY') }</h4>
              </div>

                {
                  dates[d].map(l => {
                    return this.renderByLocation(l, d)
                  })
                }
              </div>
          })
        }
        {
          this.props.isFetching &&
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        }

        <SlideUp
          screenHeight={this.state.screenHeight}
          active={this.state.showSlideup}
          onCancel={this.slideupCancel.bind(this)} >
          <BookingForm
            location={this.state.selectedLocation}
            slot={this.state.selectedSlot}
            createBooking={this.props.createBooking}
            onBookingCreated={this.onBookingCreated}
            onRequestClose={this.slideupCancel.bind(this)}
          />
        </SlideUp>

        <SlideUp
          screenHeight={this.state.screenHeight}
          active={!!this.state.createdBooking}
          onCancel={this.slideupCancel.bind(this)} >
          <BookingCompleted
            location={this.state.selectedLocation}
            booking={this.state.createdBooking}
            slot={this.state.selectedSlot}
            createBooking={this.props.createBooking}
            onBookingCreated={this.onBookingCreated}
            onRequestClose={this.slideupCancel.bind(this)}
          />
        </SlideUp>
      </div>
    );
  }
}

ExternalList.propTypes = {
  bookings: PropTypes.object,
};

export default ExternalList;
