import React from 'react';

import './styles/DateAndTimeSection.css';

class DateAndTimeSection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedBooking: null,
    };
  }


  render() {
    return (
      <div className='date-and-time-section'>
        <div className='info-section'>
          <div className='date-and-time-title'>WHERE</div>
          <div className='date-and-time-content'>Here</div>
        </div>
        <div className='info-section'>
          <div className='date-and-time-title'>WHEN</div>
          <div className='date-and-time-content'>Thursday, December 17 @ 8:00PM</div>
        </div>
      </div>
    );
  }
}

DateAndTimeSection.propTypes = {
};

export default DateAndTimeSection;