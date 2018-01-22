import React, { Component } from 'react';
import ExternalList from '../components/external/ExternalList';
import FilterMenu from '../components/search/FilterMenu';
import moment from 'moment';
import _ from 'lodash';

import './styles/ExternalPage.css';

function processBookingsByDate(bookings) {
  // console.error('bookings processing...', bookings);
  // the root object should be an object
  // date -> location array.
  // each location array item should be a list of bookings + locationname + locationid,
  // like the pre-processed object.
  // {2018-01-03T00:00:00-05:00: [{name: 'Lansdowne', ID: 'abc', bookings: []}, {name: 'ctc', id: '', bookings: []}]}
  let processed = {};
  bookings.forEach(location => {
    const grouped = _.groupBy(location.bookings, booking => {
      return moment(booking.time).startOf('day').format();
    });

    Object.keys(grouped).forEach(date => {
      if (!(date in processed)) {
        processed[date] = [];
      }

      processed[date].push({
        locationName: location.locationName,
        locationID: location.locationID,
        bookings: grouped[date],
      });
    });
  });

  return processed;
}

class ExternalPage extends Component {
  constructor(props) {
    super(props);

    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day
    end = new Date(moment(end).add(3, 'days'));

    this.state = {
      bookings: processBookingsByDate(props.bookings ? props.bookings.items : {}),
      start,
      end,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchBookings(this.state.start, this.state.end);
  }

  componentWillReceiveProps(nextProps) {
    // if new data has come in...
    if (this.props.bookings && !nextProps.bookings.isFetching && this.props.bookings.isFetching) {
      const newBookingObj = Object.assign({}, this.state.bookings);
      const newDates = processBookingsByDate(nextProps.bookings.items);
      const dates = Object.keys(newDates);
      const prevDates = Object.keys(this.state.bookings);

      dates.forEach(d => {
        if (prevDates.indexOf(d) === -1) {
          newBookingObj[d] = newDates[d];
        } else {
          newBookingObj[d] = newBookingObj[d].concat(newDates[d]);
        }
      });

      this.setState({
        bookings: newBookingObj,
      });
    }
  }

  onDateChange(start) {
    const startDate = new Date(start);

    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);
    endDate = new Date(moment(endDate).add(3, 'days'));
    this.props.fetchBookings(startDate, endDate);
    this.setState({
      bookings: {},
      start: startDate,
      end: endDate,
    });
  }

  loadMore(date) {
    // fetch more
    let newStart = moment(this.state.end).add(1, 'days');
    let newEnd = moment(newStart).add(3, 'days');

    newStart.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    newStart = new Date(newStart);
    newEnd = new Date(newEnd);

    this.setState({
      start: newStart,
      end: newEnd,
    });

    this.props.fetchBookings(newStart, newEnd);
  }

  render() {
    const isHeadless = this.props.location.query && ('headless' in this.props.location.query) && (this.props.location.query.headless === 'true');

    return (
      <div>
        <FilterMenu headless={isHeadless} onDateChange={this.onDateChange.bind(this)} />
        <ExternalList
          headless={isHeadless}
          loadMore={this.loadMore}
          isFetching={this.props.bookings.isFetching}
          createBooking={this.props.createBooking}
          bookings={this.state.bookings}
          onDateChange={this.onDateChange}
        />
      </div>
    );
  }
};

export default ExternalPage;