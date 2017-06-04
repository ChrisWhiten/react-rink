import React from 'react';
import PageBase from '../components/PageBase';
import AvailabilityList from '../components/calendar/AvailabilityList';
import DatePicker from '../components/calendar/DatePicker';
import api from '../data/api';

import './BookingPage.css';

const BookingPage = () => {
  const bookings = api.getBookings();

  return (
    <PageBase>
      <div>
        <DatePicker />
        <AvailabilityList bookings={bookings} />
      </div>
    </PageBase>
  );
};

export default BookingPage;
