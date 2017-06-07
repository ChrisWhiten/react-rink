import api from './mock-api';

const endpoints = {
  getBookings: (start, end) => {
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