import React, { Component } from 'react';
// import AvailabilityList from '../components/calendar/AvailabilityList';
import TrialCalendar from '../components/calendar/TrialCalendar';
// import DatePicker from '../components/calendar/DatePicker';
import BigCalendar from 'react-big-calendar';
import FilterMenu from '../components/search/FilterMenu';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import _ from 'lodash';

import './styles/BookingPage.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredLocationList: []
    }

    this.fetch = _.debounce(props.fetchBookings, 300);
    props.loadPage('booking');
  }

  componentDidMount() {
    // dispatch to fetch data
    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day

    console.log('fetching bookings', start, end);
    this.fetch(start, end);
  }

  _onDateChange(startDate) {
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(startDate);
    console.log('fetching bookings', startDate, endDate);
    endDate.setHours(23, 59, 59, 999);
    this.fetch(startDate, endDate);
  }

  render() {
    const isHeadless = this.props.location.query && ('headless' in this.props.location.query) && (this.props.location.query.headless === 'true');
    console.log('selected locations', this.props.locations.selectedLocations);

    return (
      <div>
        <FilterMenu
          headless={isHeadless}
          multiSelect={this.props.filterOptions.dateInterval === 1}
          locations={this.props.locations}
          onDateChange={this._onDateChange.bind(this)}
          changeSelectedLocations={this.props.changeSelectedLocations}
          changeDateInterval={this.props.changeDateInterval}
          filterOptions={this.props.filterOptions}
        />

        <TrialCalendar
          headless={isHeadless}
          filteredLocationList={this.props.locations.selectedLocations}
          createSlot={this.props.createSlot}
          walkins={this.props.walkins}
          updateBooking={this.props.updateBooking}
          bookings={this.props.bookings}
          createBooking={this.props.createBooking}
          router={this.props.router}
          locations={this.props.locations}
          fetchWalkins={this.props.fetchWalkins}
          createBlock={this.props.createBlock}
          deleteBlock={this.props.deleteBlock}
        />
      </div>
    );
  }
};

export default BookingPage;