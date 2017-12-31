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

let schedules = [{
  id: 'wjoiefjowief',
  name: 'Open Hours',
  schedule: {
    Monday: [
      new Date(2017, 3, 3, 8, 30),
      new Date(2017, 3, 3, 9, 30),
      new Date(2017, 3, 3, 10, 30),
    ],
    Tuesday: [
      new Date(2017, 3, 3, 8, 30),
      new Date(2017, 3, 3, 9, 30),
      new Date(2017, 3, 3, 10, 30),
      new Date(2017, 3, 3, 11, 30),
      new Date(2017, 3, 3, 12, 30),
      new Date(2017, 3, 3, 13, 30),
    ],
    Wednesday: [],
    Thursday: [
      new Date(2017, 3, 3, 8, 30),
    ],
    Friday: [
      new Date(2017, 3, 3, 8, 30),
      new Date(2017, 3, 3, 9, 30),
      new Date(2017, 3, 3, 10, 30),
      new Date(2017, 3, 3, 11, 30),
      new Date(2017, 3, 3, 12, 30),
      new Date(2017, 3, 3, 13, 30),
      new Date(2017, 3, 3, 14, 30),
      new Date(2017, 3, 3, 15, 30),
      new Date(2017, 3, 3, 16, 30),
      new Date(2017, 3, 3, 17, 30),
      new Date(2017, 3, 3, 18, 30),
      new Date(2017, 3, 3, 19, 30),
    ],
    Saturday: [
      new Date(2017, 3, 3, 8, 30),
      new Date(2017, 3, 3, 9, 30),
      new Date(2017, 3, 3, 10, 30),
      new Date(2017, 3, 3, 11, 30),
      new Date(2017, 3, 3, 12, 30),
      new Date(2017, 3, 3, 13, 30),
      new Date(2017, 3, 3, 14, 30),
      new Date(2017, 3, 3, 15, 30),
      new Date(2017, 3, 3, 16, 30),
      new Date(2017, 3, 3, 17, 30),
      new Date(2017, 3, 3, 18, 30),
      new Date(2017, 3, 3, 19, 30),
      new Date(2017, 3, 3, 20, 30),
      new Date(2017, 3, 3, 21, 30),
      new Date(2017, 3, 3, 22, 30),
    ],
    Sunday: [
      new Date(2017, 3, 3, 7, 30),
      new Date(2017, 3, 3, 8, 30),
      new Date(2017, 3, 3, 9, 30),
      new Date(2017, 3, 3, 10, 30),
      new Date(2017, 3, 3, 11, 30),
      new Date(2017, 3, 3, 12, 30),
      new Date(2017, 3, 3, 13, 30),
      new Date(2017, 3, 3, 14, 30),
      new Date(2017, 3, 3, 15, 30),
      new Date(2017, 3, 3, 16, 30),
      new Date(2017, 3, 3, 17, 30),
      new Date(2017, 3, 3, 18, 30),
      new Date(2017, 3, 3, 19, 30),
      new Date(2017, 3, 3, 20, 30),
      new Date(2017, 3, 3, 21, 30),
      new Date(2017, 3, 3, 22, 30),
      new Date(2017, 3, 3, 23, 30),
    ],
  },
}, {
  id: 'woijfoirgjewgjio',
  name: 'Long hours over winter',
  start: new Date(),
  end: new Date(2030, 3, 29),
  schedule: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [new Date(2017, 3, 3, 12, 30)],
  },
}];

let organized = [{
    id: 'this-is-an-id',
    title: 'foo',
    details: 'bar',
    type: 'Adult Pickup Hockey',
    organizer: 'Joe McDonald',
    duration: '60 minutes',
    venue: 'RA Centre',
    venueCity: 'Ottawa',
    time: new Date() + (1000 * 60 * 60 * 24 * 1),
    participants: [{
      id: 'odjfi',
      name: 'John Smith',
    }, {
      id: 'oijojioji',
      name: 'Carl Jenkins',
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

const locations = [{
  id: 'pijwfepiwef',
  name: 'Lansdowne Park'
}, {
  id: 'pojwfpojwf',
  name: 'Canadian Tire Centre'
}, {
  id: 'wjoefiojefwi',
  name: 'Norberry'
}];

function _generateSomeBookings() {
  const bookings = [];
  const fakeBookings = [{
    leaderName: 'Luke Skywalker',
    leaderEmail: 'luke@skywalker.com',
    leaderPhoneNumber: '613-555-5555',
    slotCount: 8,
  }, {
    leaderName: 'Han Solo',
    leaderEmail: 'han@solo.com',
    leaderPhoneNumber: '613-555-5555',
    slotCount: 5,
  }, {
    leaderName: 'Poe Dameron',
    leaderEmail: 'poe@dameron.com',
    leaderPhoneNumber: '613-555-5555',
    slotCount: 7,
  }];

  const rand = Math.random();
  if (rand < 0.1) {
    return bookings;
  }
  if (rand < 0.3) {
    bookings.push(fakeBookings[0]);
  }

  if (rand < 0.6) {
    bookings.push(fakeBookings[1]);
  }

  bookings.push(fakeBookings[2]);
  return bookings;
}

function generateBookingsList2(slots) {
  console.log('generaitng bookings list with these slots', slots);
  slots.map(s => {
    if (s.availableToBook && Math.random() < 0.1) {
      s.availabilitySlot = {
        startTime: s.time,
        endTime: moment(s.time).add(60, 'm'),
        isPublic: Math.random() > 0.8,
        totalSlots: 20,
        bookings: _generateSomeBookings(),
      };
    }
  });

  return slots;
}

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
  updateSchedule: (schedule) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (schedule.id) {
          const idx = schedules.findIndex(s => s.id === schedule.id);
          schedules[idx] = schedule;
          return resolve(schedule);
        }
        schedule.id = guid();
        schedules.push(schedule);
        return resolve(schedule);
      }, 700);
    });
  },

  getSchedule: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(schedules.filter(s => s.id === id)[0]);
      }, 800);
    });
  },

  getSchedules: (start, end) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(schedules);
      }, 1000);
    });
  },

  getBookings: (start, end) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(generateBookingList(start, end));
      }, 800);
    });
  },

  getBookings2: (start, end, calendar) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let results = [];
        locations.map(l => {
          results.push({
            locationId: l.id,
            locationName: l.name,
            bookings: generateBookingsList2(calendar),
          });
        });
        
        return resolve(results);
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
  },

  getLocations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(locations);
      }, 1000);
    });
  }
};

export default endpoints;