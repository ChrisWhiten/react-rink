import api from './mock-api';
// import api from './sls-api';
import moment from 'moment';

function createBookingsList(start, end, events, timestep) {
  let bookingsList = [];
  let currentDate = moment(start);

  return new Promise(resolve => {
    while (currentDate < end) {
      bookingsList.push({
        time: new Date(currentDate),
        availableToBook: Math.random() > .3,
      });
      currentDate = currentDate.add(timestep, 'm');
    }

    resolve(bookingsList);
  });
}

const endpoints = {
  getBookings: (start, end) => {
    return api.getBookings(start, end)
      .then(json => {
        return createBookingsList(start, end, json, 30);
      });
  },

  getBookingById: (id) => {
    return api.getBooking(id);
  },

  getUpcomingOrganized: () => {
    return api.getUpcomingOrganized();
  },

  getUpcomingParticipations: () => {
    return api.getUpcomingParticipations();
  },

  getAvailableEvents: (start, end) => {
    return api.getAvailableEvents(start, end);
  },

  getParticipationInvitations: () => {
    return api.getParticipationInvitations();
  },
};

export default endpoints;