import React, { Component } from 'react';
import ExternalList from '../components/external/ExternalList';
import FilterMenu from '../components/search/FilterMenu';

import './styles/ExternalPage.css';

class ExternalPage extends Component {
  componentDidMount() {
    // dispatch to fetch data
    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day
    this.props.fetchBookings(start, end);
  }

  _onDateChange(startDate) {
    let endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);
    this.props.fetchBookings(startDate, endDate);
  }

  render() {
    return (
      <div>
        <FilterMenu />
        <ExternalList bookings={this.props.bookings} />
      </div>
    );
  }
};

export default ExternalPage;