import React from 'react';

import PageBase from '../components/PageBase';
import EventDetail from '../components/event/EventDetail';
import ParticipantList from '../components/event/ParticipantList';
import api from '../data/api';

import './styles/EventPage.css';

const EventPage = (props) => {
  const booking = api.getBookingById(props.params.eventId);
  return (
    <PageBase>
      <div className='event-page-container'>
        <EventDetail event={booking} />
        <ParticipantList event={booking} />
      </div>
    </PageBase>
  );
};

export default EventPage;
