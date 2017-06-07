import moment from 'moment';

let organized = [{
    id: 'this-is-an-id',
    title: 'foo',
    details: 'bar',
    type: 'Adult Pickup Hockey',
    organizer: 'John Smith',
    duration: '60 minutes',
    venue: 'RA Centre',
    venueCity: 'Ottawa',
    time: new Date() + (1000 * 60 * 60 * 24 * 1),
    participants: [{
      id: 'odjfi',
      name: 'Sherlock Holmes',
    }, {
      id: 'oijojioji',
      name: 'Iron Man',
    }]
  }, {
    id: 'another-id',
    title: 'baz',
    details: 'bad',
    type: 'Figure Skating',
    organizer: 'Mark Hamill',
    duration: '120 minutes',
    venue: 'Community Center',
    venueCity: 'Smiths Falls',
    time: new Date() + (1000 * 60 * 60 * 24 * 5),
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
    // type: 'Adult Pickup Hockey',
    type: 'Singing',
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
    // type: 'Adult Organized Hockey',
    type: 'Skipping',
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
    // type: 'Public Skating',
    type: 'Dancing',
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

let participationInvitations = [{
  id: 'oifejw',
  eventId: 'oijgreoijer',
  datetime: new Date() + (1000 * 60 * 60 * 24 * 5),
  venueId: 'jpofe',
  venueName: 'SF Arena',
  eventTypeName: 'Pickup hockey',
  position: 'Skater',
  inviter: 'Joe Smith',
  price: 17.3
}, {
  id: 'iojriejoje',
  eventId: 'fwwfwefwef',
  datetime: new Date() + (1000 * 60 * 60 * 24),
  venueId: 'fweef',
  venueName: 'Test Center',
  eventTypeName: 'Pickup hockey',
  position: 'Skater',
  inviter: 'Wayne Simmonds',
  price: 11.75
}];

function generateBookingList(start, end) {
  let list = [];
  const timeslot = 30; // 30 minutes
  let currentDate = start;

  while (currentDate < end) {
    list.push({
      time: currentDate,
      availableToBook: Math.random() > 0.2, // in practice, actually generate this status based on fetched availability...server-side
    });
    // at the end...
    currentDate = moment(currentDate).add(timeslot, 'm');
  }

  return list;
}

const endpoints = {
  getBookings: (start, end) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(generateBookingList(start, end));
      }, 800);
    });
  },

  getUpcomingOrganized: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(organized);
      }, 1500);
    });
  },

  getUpcomingParticipations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(upcoming);
      }, 1750);
    });
  },

  getAvailableEvents: (start, end) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(availableEvents);
      }, 2000);
    });
  },

  getParticipationInvitations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(participationInvitations);
      }, 2000);
    });
  },

  getBooking: (id) => {
    const eventFromOrganized = organized.filter(e => e.id === id);
    if (eventFromOrganized.length === 1) {
      return eventFromOrganized[0];
    }

    const eventFromAvailable = availableEvents.filter(e => e.id === id);
    if (eventFromAvailable.length === 1) {
      return eventFromAvailable[0];
    }

    return null;
  }
};

export default endpoints;