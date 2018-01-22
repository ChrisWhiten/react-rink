import React from 'react';
import moment from 'moment';

import './styles/DateAndTimeSection.css';

class DateAndTimeSection extends React.Component {
  render() {
    const where = this.props.location ? this.props.location.locationName : '';
    const date = this.props.booking ? moment(this.props.booking.time || this.props.booking.start).format('dddd, MMM Do, YYYY') : '';
    const time = this.props.booking ? moment(this.props.booking.time || this.props.booking.start).format('LT') : '';
    const showGuestsSection = !!this.props.showGuestsSection;
    let guestsText = '';
    if (this.props.booking) {
      guestsText = this.props.booking.slotCount === 1 ? '1 person' : `${this.props.booking.slotCount} people`;
    }

    return (
      <div className='date-and-time-section'>
        <div className='info-section'>
          <div className='date-and-time-title'>WHERE</div>
          <div className='date-and-time-content'>{where}</div>
        </div>
        <div className='info-section'>
          <div className='date-and-time-title'>DATE</div>
          <div className='date-and-time-content'>{date}</div>
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
    );
  }
}

DateAndTimeSection.propTypes = {
};

export default DateAndTimeSection;