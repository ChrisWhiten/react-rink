import axios from 'axios';
const apiSource = process.env.NODE_ENV === 'production' /*|| true*/ ? 'https://qrd5rbrpj3.execute-api.us-west-2.amazonaws.com/Stage' : 'http://localhost:3000';
const cancellationTokens = [];
let latestStart;
const endpoints = {
  addNoteToBooking: (id, note) => {
    return axios.post(`${apiSource}/bookings/${id}/notes`, { note })
      .then(res => {
        console.error('note added?', res);
        return res.data.Attributes;
      })
      .catch(err => {
        console.error('error adding note', err);
        throw err;
      });
  },

  createSlot: (slot) => {
    return axios.post(`${apiSource}/slots`, slot)
      .then(res => {
        console.error('slot created?', res);
        return res.data;
      })
      .catch(err => {
        console.error('error creating slot', err);
        throw err;
      });
  },

  fetchBooking: (id) => {
    return axios.get(`${apiSource}/bookings/${id}`)
      .then(res => {
        return res.data;
      });
  },

  updateBooking: (booking) => {
    // these are unused...consider whitelisting, but not sure that we need to here.
    // console.error('update params...????', booking);
    // const bookingParams = {
    //   id: booking.id,
    //   checkedIn: booking.checkedIn,
    // };

    return axios.put(`${apiSource}/bookings/${booking.id}`, booking)//bookingParams)
      .then(res => {
        console.log('updated booking', res);
        return res.data.Attributes;
      })
      .catch(err => {
        console.error('error updating booking', err);
        throw err;
      });
  },

  deleteBlock: (blockId) => {
    return axios.delete(`${apiSource}/blocks/${blockId}`)
      .then(res => {
        console.log('block deleted', res);
        return res.data;
      })
      .catch(err => {
        console.error('error deleting block', err);
        throw err;
      });
  },

  createBlock: (block) => {
    return axios.post(`${apiSource}/blocks`, block)
      .then(res => {
        console.log('created block', res);
        return res.data;
      })
      .catch(err => {
        console.error('error creating block', err);
        throw err;
      });
  },

  createBooking: (booking) => {
    return axios.post(`${apiSource}/bookings`, booking)
      .then(res => {
        console.log('created booking', res);
        return res.data;
      })
      .catch(err => {
        console.error('error creating booking', err);
        throw err;
      });
  },

  getLocations: () => {
    return axios.get(`${apiSource}/locations`)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error('error getting locations', err);
        return [];
      });
  },

  getBookings2: (start, end, isWalkins) => {
    console.debug('requesting', new Date(start), isWalkins);
    // axios cancel is not dependable.  lots of garbage logic here to work around it
    if (!isWalkins) {
      latestStart = start;
      if (cancellationTokens.length > 0) {
        while (cancellationTokens.length > 0) {
          const token = cancellationTokens.pop();
          token('Cancelling booking request');
        }
      }
    }

    const cancellationRequestObj = isWalkins ? {} : {
      cancelToken: new axios.CancelToken(c => {
        cancellationTokens.push(c);
      }),
    };

    return axios.get(`${apiSource}/slots?start=${start}&end=${end}`, cancellationRequestObj).then(res => {
      // if another, newer request hasn't showed up since this get returned
      if (isWalkins || (!isWalkins && start === latestStart)) {

        console.debug('returning', new Date(start));
        return res.data;
      } else {
        console.debug('axios race condition - cancelled', new Date(start));
        throw new Error('cancelled');
      }
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.debug('Cancelled request', new Date(start), new Date(end));
        throw new Error('cancelled');
      } else {
        console.error('error getting slots', err);
        return [];
      }
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

  deleteSchedule: (id) => {
    return axios.delete(`${apiSource}/schedules/${id}`)
      .then(res => {
        console.log('schedule deleted', res);
        return res;
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
        console.error('Error getting bookingsz');
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