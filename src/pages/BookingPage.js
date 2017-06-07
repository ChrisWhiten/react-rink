import React, { Component } from 'react';
import PageBase from '../components/PageBase';
import AvailabilityList from '../components/calendar/AvailabilityList';
import DatePicker from '../components/calendar/DatePicker';

import './BookingPage.css';

class BookingPage extends Component {
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
	    <PageBase>
	      <div>
	        <DatePicker onDateChange={this._onDateChange.bind(this)} />
	        <AvailabilityList bookings={this.props.bookings} />
	      </div>
	    </PageBase>
	  );
	}
};

export default BookingPage;