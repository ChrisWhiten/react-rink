import axios from 'axios';
const apiSource = 'http://localhost:3000';
const endpoints = {
  getLocations: () => {
    console.log('getting locations');
    return axios.get(`${apiSource}/locations`)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error('error getting locations', err);
        return [];
      });
  },

  getBookings2: (start, end) => {
    console.log('getting bookings 2', start, end);
    return axios.get(`${apiSource}/slots?start=${start}&end=${end}`).then(res => {
      console.log('got slots', res.data);
      return res.data;
    }).catch(err => {
      console.error('error getting slots', err);
      return [];
    });
  },

  getSchedules: (start, end) => {
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();
    return fetch(`${apiSource}/schedules?start=${startTimestamp}&end=${endTimestamp}`)
      .then(res => {
        console.log('returning schedules', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error returning schedules', err);
        return [];
      });
  },

  createSchedule: (schedule) => {
    console.log('creating schedule:', schedule);
    return axios.post(`${apiSource}/schedules`, schedule)
      .then(response => {
        console.log('schedule created', response);
        return response;
      })
      .catch(err => {
        console.log('error creating schedule', err);
        return null;
      });
  },

  updateSchedule: (schedule) => {
    return axios.put(`${apiSource}/schedules/${schedule.id}`, schedule)
      .then(response => {
        console.log('schedule updated', response);
        return response;
      })
      .catch(err => {
        console.error('error updating schedule', err);
        return null;
      });
  },

  getSchedule: (id) => {
    return fetch(`${apiSource}/schedules/${id}`)
      .then(res => {
        console.log('returning schedule', res);
        return res.json();
      })
      .catch(err => {
        console.error('Error returning schedule', err);
        return null;
      });
  },

  getBookings: (start, end) => {
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