import React, { Component } from 'react';
import EditAvailabilitySchedule from '../components/availabilityschedule/EditAvailabilitySchedule';
import './styles/EditAvailabilitySchedulePage.css';

class EditAvailabilitySchedulePage extends Component {
  componentDidMount() {
    if (this.props.params.scheduleId) {
      this.props.fetchSchedule(this.props.params.scheduleId);
    }
  }

  render() {
    return (
      <div>
        <EditAvailabilitySchedule
          createSchedule={this.props.createSchedule}
          router={this.props.router}
          updateSchedule={this.props.updateSchedule}
          schedule={this.props.schedule}
          locations={this.props.locations}
        />
      </div>
    );
  }
};

export default EditAvailabilitySchedulePage;