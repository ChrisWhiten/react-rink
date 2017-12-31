import React, { Component } from 'react';
import ScheduleSummary from '../components/availabilityschedule/ScheduleSummary';
import './styles/AvailabilitySchedulePage.css';

class AvailabilitySchedulePage extends Component {
  constructor(props) {
    super(props);

    // fetch schedule data
    props.fetchSchedules(new Date(), new Date(2040, 0, 0));
  }

  render() {
    return (
      <div>
        <ScheduleSummary schedules={this.props.schedules} bookings={this.props.bookings} />
      </div>
    );
  }
};

export default AvailabilitySchedulePage;