import React, { Component } from 'react';
// import AvailabilityList from '../components/calendar/AvailabilityList';
import TrialCalendar from '../components/calendar/TrialCalendar';
// import DatePicker from '../components/calendar/DatePicker';
import BigCalendar from 'react-big-calendar';
import FilterMenu from '../components/search/FilterMenu';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import './styles/BookingPage.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class BookingPage extends Component {
  componentDidMount() {
    // dispatch to fetch data
    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day

    console.log('fetching bookings', start, end);
    this.props.fetchBookings(start, end);
  }

  _onDateChange(startDate) {
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(startDate);
    console.log('fetching bookings', startDate, endDate);
    endDate.setHours(23, 59, 59, 999);
    this.props.fetchBookings(startDate, endDate);
  }

  render() {
    // const msgs = {
    //   allDay: '',
    // };

    // return (
    //   <PageBase>
    //     <div>
    //       <DatePicker onDateChange={this._onDateChange.bind(this)} />
    //       <BigCalendar
    //         selectable
    //         events={[]}
    //         toolbar={true}
    //         views={['month', 'week', 'day']}
    //         messages={msgs}
    //         defaultView='week'
    //         scrollToTime={new Date()}
    //         defaultDate={new Date()}
    //         onSelectEvent={event => alert(event.title)}
    //         onSelectSlot={(slotInfo) => alert(
    //           `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //           `\nend: ${slotInfo.end.toLocaleString()}`
    //         )}
    //       />
    //     </div>
    //   </PageBase>
    // );


    // return (
    //   <PageBase>
    //     <div>
    //       <DatePicker onDateChange={this._onDateChange.bind(this)} />
    //       <AvailabilityList bookings={this.props.bookings} />
    //     </div>
    //   </PageBase>
    // );
    return (
      <div>
        <FilterMenu onDateChange={this._onDateChange.bind(this)} />
        <TrialCalendar
          bookings={this.props.bookings}
          createBooking={this.props.createBooking}
        />
      </div>
    );
  }
};

export default BookingPage;