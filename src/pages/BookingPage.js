import React, { Component } from 'react';
import PageBase from '../components/PageBase';
import AvailabilityList from '../components/calendar/AvailabilityList';
import DatePicker from '../components/calendar/DatePicker';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import './BookingPage.css';

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
    this.props.fetchBookings(start, end);
  }

  _onDateChange(startDate) {
    let endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);
    this.props.fetchBookings(startDate, endDate);
  }

  render() {
    const msgs = {
      allDay: '',
    };

    return (
      <PageBase>
        <div>
          <DatePicker onDateChange={this._onDateChange.bind(this)} />
          <BigCalendar
            selectable
            events={[]}
            toolbar={true}
            views={['month', 'week', 'day']}
            messages={msgs}
            defaultView='week'
            scrollToTime={new Date()}
            defaultDate={new Date()}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}`
            )}
          />
        </div>
      </PageBase>
    );
    // return (
    //   <PageBase>
    //     <div>
    //       <DatePicker onDateChange={this._onDateChange.bind(this)} />
    //       <AvailabilityList bookings={this.props.bookings} />
    //     </div>
    //   </PageBase>
    // );
  }
};

export default BookingPage;