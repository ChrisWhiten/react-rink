const apiSource = 'http://localhost:3000';
const endpoints = {
  getBookings: (start, end) => {
    console.log('cool', start, end)
    let startTimestamp = start.getTime();
    let endTimestamp = end.getTime();
    return fetch(`${apiSource}/bookings?start=${startTimestamp}&end=${endTimestamp}&type=calendar`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error getting bookings');
        console.error(err);
        return [];
      });
  },

  getUpcomingOrganized: () => {
    return fetch(`${apiSource}/bookings?type=upcoming`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error getting upcoming organized');
        console.error(err);
        return [];
      });
  },

  getUpcomingParticipations: () => {
    return fetch(`${apiSource}/bookings?type=upcoming`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error getting upcoming participations');
        console.error(err);
        return [];
      });
  },

  getAvailableEvents: (start, end) => {
    return fetch(`${apiSource}/bookings?type=calendar&start=${start}&end=${end}`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error getting available events');
        console.error(err);
        return [];
      });
  },

  getParticipationInvitations: () => {
    return fetch(`${apiSource}/bookings?type=participating`)
      .then(res => {
        console.log('returning?', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error getting participation invitations');
        console.error(err);
        return [];
      });
  },

  getBooking: (id) => {
    return null;
  }
};

export default endpoints;