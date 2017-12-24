import React, {PropTypes} from 'react';
import {
  Panel,
} from 'react-bootstrap';
import People from 'material-ui/svg-icons/social/people';
import moment from 'moment';
import classNames from 'classnames';

import './ExternalList.css';

class ExternalList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
      date: new Date(),
    };
  }

  renderSlot(slot) {
    let availabilities = slot.totalSlots;
    slot.bookings.map(b => {
      availabilities -= b.slotCount;
    });
    console.log('slot', slot);

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
      <div className={slotClass}>
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
          = Unavailable
          </div>
          <div className='legend-empty available' />
          <div className='legend-text'>
          = Available (click to book)
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
          {location.locationId} - {location.locationName}
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
          { moment(this.state.date).format('dddd, MMMM Do, YYYY') }
        </div>

          {
            this.props.bookings.items.map(l => {
              return this.renderByLocation(l)
            })
          }
      </div>
    );
  }
}

ExternalList.propTypes = {
  bookings: PropTypes.object,
};

export default ExternalList;
