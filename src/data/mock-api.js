let bookings = [{
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

let organized = [{
    title: 'foo',
    details: 'bar',
  }];

let upcoming = [];

const today = new Date();
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
let lastHour = today;
lastHour.setHours(lastHour.getHours() - 1);
let availableEvents = [
  {
    datetime: today,
    host: 'Chris',
    id: 'asbadfs',
    type: 'Adult Pickup Hockey',
    duration: 60,
  }, {
    datetime: lastHour,
    host: 'Jim',
    id: 'ojiefw',
    type: 'Adult Organized Hockey',
    duration: 90,
  }, {
    datetime: yesterday,
    host: 'Wayne',
    id: 'weofij',
    type: 'Public Skating',
    duration: 120,
  },
];

const endpoints = {
  getBookings: (start, end) => {
    return bookings;
  },

  getUpcomingOrganized: () => {
    return organized;
  },

  getUpcomingParticipations: () => {
    return upcoming;
  },

  getAvailableEvents: (start, end) => {
    return availableEvents;
  },
};

export default endpoints;