import React from 'react';

import PageBase from '../components/PageBase';
import EventDetail from '../components/event/EventDetail';
import api from '../data/api';

import './EventPage.css';

const EventPage = (props) => {
  const booking = api.getBookingById(props.params.eventId);
  console.log(booking);
  return (
    <PageBase title="Event"
              navigation="OneRink / Event">

      <div>
        {props.params.eventId}
        <EventDetail event={booking} />
      </div>
    </PageBase>
  );
};

export default EventPage;
