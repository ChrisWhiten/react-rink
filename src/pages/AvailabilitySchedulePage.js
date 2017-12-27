import React, { Component } from 'react';
import ScheduleSummary from '../components/availabilityschedule/ScheduleSummary';
import './styles/AvailabilitySchedulePage.css';

class AvailabilitySchedulePage extends Component {
  componentDidMount() {
    // dispatch to fetch data
    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day
    this.props.fetchBookings(start, end);
  }

  render() {
    return (
      <div>
        <ScheduleSummary bookings={this.props.bookings} />
      </div>
    );
  }
};

export default AvailabilitySchedulePage;