import React from 'react';
import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500} from 'material-ui/styles/colors';

import PageBase from '../components/PageBase';
import AvailabilityList from '../components/calendar/AvailabilityList';
import DatePicker from '../components/calendar/DatePicker';
import api from '../data/api';

import './BookingPage.css';

const BookingPage = () => {
  const bookings = api.getBookings();

  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  };

  return (
    <PageBase title="Book Ice Time"
              navigation="OneRink / Book Ice Time">

      <div>
        <Link to="/profile" >
          <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink500}}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        <DatePicker />
        <AvailabilityList bookings={bookings} />
      </div>
    </PageBase>
  );
};

export default BookingPage;
