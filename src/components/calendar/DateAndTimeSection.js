import React from 'react';
import moment from 'moment';

import './styles/DateAndTimeSection.css';

class DateAndTimeSection extends React.Component {
  render() {
    const where = this.props.location ? this.props.location.locationName : '';
    const when = this.props.booking ? moment(this.props.booking.availabilitySlot.startTime).format('dddd, MMM do, YYYY @ LT') : '';
    return (
      <div className='date-and-time-section'>
        <div className='info-section'>
          <div className='date-and-time-title'>WHERE</div>
          <div className='date-and-time-content'>{where}</div>
        </div>
        <div className='info-section'>
          <div className='date-and-time-title'>WHEN</div>
          <div className='date-and-time-content'>{when}</div>
        </div>
      </div>
    );
  }
}

DateAndTimeSection.propTypes = {
};

export default DateAndTimeSection;