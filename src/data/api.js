import api from './mock-api';
//const api = mock-api();

const endpoints = {
  getBookings: () => {
    const start = new Date();
    const end = new Date(); // do we need these?
    return api.getBookings(start, end);
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