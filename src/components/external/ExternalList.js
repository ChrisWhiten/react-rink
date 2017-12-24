import React, {PropTypes} from 'react';
import {
  Panel,
} from 'react-bootstrap';
import People from 'material-ui/svg-icons/social/people';
import moment from 'moment';
import classNames from 'classnames';

import SlideUp from '../calendar/SlideUp';
import BookingForm from '../calendar/BookingForm';

import './ExternalList.css';

class ExternalList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
      date: new Date(),
      screenWidth: 0,
      screenHeight: 0,
      showSlideup: false,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  checkout() {
    this.setState({
      showSlideup: true,
    });
  }

  slideupCancel() {
    this.setState({
      showSlideup: false,
    });
  }

  renderSlot(slot) {
    let availabilities = slot.totalSlots;
    slot.bookings.map(b => {
      availabilities -= b.slotCount;
    });

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
      <div className={slotClass} onTouchTap={this.checkout}>
        <div className='external-slot-time'>
          { moment(slot.startTime).format('LT') }
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

  renderByLocation(location) {
    const slots = location.bookings.filter(b => {
      return b.availabilitySlot;
    });

    return (
      <div className='container location-rendered'>
        <div className='location-metadata'>
          <h5>{location.locationName}</h5>
        </div>
        
        <hr className='external-separator' />

        <div className='location-bookings'>
          {
            slots.map(b => this.renderSlot(b.availabilitySlot))
          }
        </div>

        <hr className='external-separator' />

        { this.renderLegend() }
      </div>
    );
  }

  render() {
    const { bookings } = this.props;

    return (
      <div className='external-list'>
        <div className='container external-date'>
          <h4>{ moment(this.state.date).format('dddd, MMMM Do, YYYY') }</h4>
        </div>

          {
            this.props.bookings.items.map(l => {
              return this.renderByLocation(l)
            })
          }

        <SlideUp
          screenHeight={this.state.screenHeight}
          active={this.state.showSlideup}
          onCancel={this.slideupCancel.bind(this)} >
          <BookingForm
            booking={this.state.selectedBooking}
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
