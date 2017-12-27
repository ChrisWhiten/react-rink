import React, { Component } from 'react';
import EditAvailabilitySchedule from '../components/availabilityschedule/EditAvailabilitySchedule';
import './styles/EditAvailabilitySchedulePage.css';

class EditAvailabilitySchedulePage extends Component {
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
        <EditAvailabilitySchedule bookings={this.props.bookings} />
      </div>
    );
  }
};

export default EditAvailabilitySchedulePage;