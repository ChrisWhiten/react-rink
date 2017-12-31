import api from './mock-api';
// import api from './sls-api';
import moment from 'moment';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function generateCalendar(start, end) {
  // generate full list of 15-minute availability (open/closed)
  let list = [];
  const timeslot = 15; // 15 minutes
  let currentDate = start;

  while (currentDate < end) {
    list.push({
      id: guid(),
      time: new Date(currentDate),
      availableToBook: Math.random() > 0.2, // in practice, actually generate this status based on fetched availability...server-side
    });
    // at the end...
    currentDate = moment(currentDate).add(timeslot, 'm');
  }

  return list;
}

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
  getLocations: () => {
    return api.getLocations();
  },

  getBookings: (start, end) => {
    return api.getBookings(start, end)
      .then(json => {
        return createBookingsList(start, end, json, 30);
      });
  },

  getBookings2: (start, end) => {
    return api.getBookings2(start, end, generateCalendar(start, end))
      .then(bookings => {
        console.log('bookings???', bookings);
        return bookings;
      });;
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

  getSchedules: (start, end) => {
    return api.getSchedules(start, end);
  },

  getSchedule: (id) => {
    return api.getSchedule(id);
  },

  updateSchedule: (schedule) => {
    return api.updateSchedule(schedule);
  },

  createSchedule: (schedule) => {
    return api.createSchedule(schedule);
  },

  deleteSchedule: (id) => {
    return api.deleteSchedule(id);
  },
};

export default endpoints;