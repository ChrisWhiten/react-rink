const endpoints = {
  getBookings: (start, end) => {
    console.log('cool', start, end)
    let startTimestamp = start.getTime();
    let endTimestamp = end.getTime();
    return fetch(`http://localhost:3000/bookings?start=${startTimestamp}&end=${endTimestamp}&type=calendar`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      });
  },

  getUpcomingOrganized: () => {
    return fetch('http://localhost:3000/bookings?type=upcoming')
      .then(res => {
        console.log('returning?', res);
        return res.json();
      });
  },

  getUpcomingParticipations: () => {
    return fetch('http://localhost:3000/bookings?type=upcoming')
      .then(res => {
        console.log('returning?', res);
        return res.json();
      });
  },

  getAvailableEvents: (start, end) => {
    return fetch(`http://localhost:3000/bookings?type=calendar&start=${start}&end=${end}`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      });
  },

  getParticipationInvitations: () => {
    return fetch('http://localhost:3000/bookings?type=participating')
      .then(res => {
        console.log('returning?', res);
        return res.json();
      });
  },

  getBooking: (id) => {
    return null;
  }
};

export default endpoints;