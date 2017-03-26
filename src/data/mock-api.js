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
    pricePerSkater: 17,
    pricePerGoalie: 5,
    skillLevel: 'all', //beginner, intermediate, advanced
    genders: 'all',
    maxSkaters: 40,
    maxGoalies: 2,
    registeredSkaters: 12,
    registeredGoalies: 1,
    owned: false,

  }, {
    datetime: lastHour,
    host: 'Jim',
    id: 'ojiefw',
    type: 'Adult Organized Hockey',
    duration: 90,
    pricePerSkater: 7,
    pricePerGoalie: 0,
    skillLevel: 'beginner', //beginner, intermediate, advanced
    genders: 'male',
    maxSkaters: 20,
    maxGoalies: 1,
    registeredSkaters: 9,
    registeredGoalies: 1,
    owned: true,
  }, {
    datetime: yesterday,
    host: 'Wayne',
    id: 'weofij',
    type: 'Public Skating',
    duration: 120,
    pricePerSkater: 107,
    pricePerGoalie: 50,
    skillLevel: 'advanced', //beginner, intermediate, advanced
    genders: 'female',
    maxSkaters: 25,
    maxGoalies: 0,
    registeredSkaters: 2,
    owned: false,
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