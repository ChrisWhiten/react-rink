import React from 'react';
import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey500} from 'material-ui/styles/colors';

import PageBase from '../components/PageBase';
import AvailabilityList from '../components/calendar/AvailabilityList';
import DatePicker from '../components/calendar/DatePicker';

import './BookingPage.css';

const BookingPage = () => {
  const bookings = [{
    time: new Date(),
    availableToBook: true,
  },{
    time: new Date() - 1000,
    availableToBook: true,
  },{
    time: new Date() - 10000,
    availableToBook: true,
  },{
    time: new Date() - 5000,
    availableToBook: true,
  }];

  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '40%'
      },
      price: {
        width: '20%'
      },
      category: {
        width: '20%'
      },
      edit: {
        width: '10%'
      }
    },
  };

  return (
    <PageBase title="Book Ice Time"
              navigation="OneRink / Book Ice Time">

      <div>
        <Link to="/form" >
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
