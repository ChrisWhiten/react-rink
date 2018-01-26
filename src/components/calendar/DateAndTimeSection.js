import React from 'react';
import moment from 'moment';
import Place from 'material-ui/svg-icons/maps/place';

import './styles/DateAndTimeSection.css';

class DateAndTimeSection extends React.Component {
  render() {
    const where = this.props.location ? this.props.location.locationName : '';
    const date = this.props.booking ? moment(this.props.booking.time || this.props.booking.start).format('dddd, MMM Do, YYYY') : '';
    const smallerDate = this.props.booking ? moment(this.props.booking.time || this.props.booking.start).format('MMM Do') : '';
    const time = this.props.booking ? moment(this.props.booking.time || this.props.booking.start).format('LT') : '';
    const showGuestsSection = !!this.props.showGuestsSection;
    let guestsText = '';
    if (this.props.booking) {
      guestsText = this.props.booking.slotCount === 1 ? '1 person' : `${this.props.booking.slotCount} people`;
    }

    return (
      <div className='date-and-time-section'>
        <div className='location-title-section'>
          <Place className='location-title-place-icon' />
          <span>
            {where}
          </span>
        </div>
        <div className='info-items'>
          <div className='info-section only-bigger-than-mediumish'>
            <div className='date-and-time-title'>WHERE</div>
            <div className='date-and-time-content'>{where}</div>
          </div>
          <div className='info-section'>
            <div className='date-and-time-title'>DATE</div>
            <div className='date-and-time-content-big'>{date}</div>
            <div className='date-and-time-content-small'>{smallerDate}</div>
          </div>
          <div className='info-section'>
            <div className='date-and-time-title'>TIME</div>
            <div className='date-and-time-content'>{time}</div>
          </div>
          {
            showGuestsSection &&
            <div className='info-section'>
              <div className='date-and-time-title'>GUESTS</div>
              <div className='date-and-time-content'>{guestsText}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

DateAndTimeSection.propTypes = {
};

export default DateAndTimeSection;