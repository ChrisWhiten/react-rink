import {
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
  FETCHING_INVITATIONS,
  FETCHING_INVITATIONS_ERROR,
  FETCHING_INVITATIONS_SUCCESS,
  FETCHING_ORGANIZED,
  FETCHING_ORGANIZED_SUCCESS,
  FETCHING_ORGANIZED_ERROR,
  FETCHING_PARTICIPATIONS,
  FETCHING_PARTICIPATIONS_SUCCESS,
  FETCHING_PARTICIPATIONS_ERROR,
  FETCHING_BOOKINGS,
  FETCHING_BOOKINGS_ERROR,
  FETCHING_BOOKINGS_SUCCESS,
  FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  FETCHING_EVENTS_ERROR,
  GET_SCHEDULES_ERROR,
  FETCHING_SCHEDULES_SUCCESS,
  FETCHING_SCHEDULES,
  FETCH_SCHEDULE_ERROR,
  FETCH_SCHEDULE_SUCCESS,
  FETCHING_SCHEDULE,
  UPDATING_SCHEDULE,
  UPDATING_SCHEDULE_SUCCESS,
  UPDATING_SCHEDULE_ERROR,
  CREATING_SCHEDULE,
  CREATING_SCHEDULE_SUCCESS,
  CREATING_SCHEDULE_ERROR,
  FETCHING_LOCATIONS,
  FETCHING_LOCATIONS_SUCCESS,
  FETCHING_LOCATIONS_ERROR,
  SCHEDULE_DELETED,
  DELETING_SCHEDULE,
  DELETE_SCHEDULE_ERROR,
  TRY_CREATE_BOOKING,
  BOOKING_CREATED,
  CREATE_BOOKING_ERROR,
  BOOKING_UPDATING,
  BOOKING_UPDATE_ERROR,
  BOOKING_UPDATED,
  FETCH_BOOKING_ERROR,
  BOOKING_FETCHED,
  FETCHING_BOOKING,
  FETCHING_WALKINS,
  FETCHING_WALKINS_SUCCESS,
  FETCHING_WALKINS_ERROR,
  CREATING_SLOT_ERROR,
  SLOT_CREATED,
  CREATING_SLOT,
  ADDING_NOTE_TO_BOOKING,
  TRY_CREATE_BLOCK,
  BLOCK_CREATED,
  CREATE_BLOCK_ERROR,
} from './constants/actionTypes';
import moment from 'moment';

import api from './data/api';

// action creators
////////////////////

// slots
export function createSlot(slot, cb) {
  return (dispatch) => {
    dispatch(requestCreateSlot());
    return api.createSlot(slot)
      .then(json => {
        dispatch(slotCreated(json));

        if (cb) {
          cb(null, json);
        }
      })
      .catch(err => {
        console.error('error creating slot', err);
        dispatch(createSlotError(err));

        if (cb) {
          cb(err, null);
        }
      });
  };
}

function requestCreateSlot() {
  return { type: CREATING_SLOT };
}

function slotCreated(slot) {
  return { type: SLOT_CREATED, slot };
}

function createSlotError(error)  {
  return { type: CREATING_SLOT_ERROR, error }
}

// walk-ins
export function fetchWalkins() {
  // should set up a timer and everything...
  return (dispatch) => {
    // get current time - 1hr, current time + 1hr, request slots from that interval?
    let start = moment().subtract(1, 'hour');
    start.set({
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    start = start.valueOf();
    let end = moment().add(1, 'hour').valueOf()

    dispatch(requestWalkins(start));

    return api.getBookings2(start, end, true)
      .then(json => {
        dispatch(receiveWalkins(json, start));
      })
      .catch(err => {
        console.error('error getting bookings', err);
        dispatch(getWalkinsError());
      });
  };
}

function requestWalkins(start) {
  return { type: FETCHING_WALKINS, start };
}

function receiveWalkins(bookings, start) {
  return { type: FETCHING_WALKINS_SUCCESS, bookings, start };
}

function getWalkinsError() {
  return { type: FETCHING_WALKINS_ERROR };
}

// locations
export function fetchLocations() {
  return (dispatch) => {
    dispatch(requestLocations());

    return api.getLocations()
      .then(json => {
        dispatch(receiveLocations(json.data || []));
      })
      .catch(err => {
        console.error('error getting locations', err);
        dispatch(getLocationsError());
      });
  };
}

function requestLocations() {
  return { type: FETCHING_LOCATIONS };
}

function receiveLocations(locations) {
  return { type: FETCHING_LOCATIONS_SUCCESS, locations };
}

function getLocationsError() {
  return { type: FETCHING_LOCATIONS_ERROR };
}

// invitations
export function declineInvitation(invitationId) {
  return { type: DECLINE_INVITATION, id: invitationId };
}

export function acceptInvitation(invitationId) {
  return { type: ACCEPT_INVITATION, id: invitationId };
}

export function fetchInvitations() {
  return function(dispatch) {
    dispatch(requestInvitations());

    return api.getParticipationInvitations()
      .then(json => {
        dispatch(receiveInvitations(json));
      })
      .catch(err => {
        console.error('error getting invitations', err);
        dispatch(getInvitationsError());
      });
  }
}

function requestInvitations() {
  return { type: FETCHING_INVITATIONS };
}

function receiveInvitations(invitations) {
  return { type: FETCHING_INVITATIONS_SUCCESS, invitations: invitations };
}

function getInvitationsError() {
  return { type: FETCHING_INVITATIONS_ERROR };
}

// events
export function fetchUpcomingOrganized() {
  return function(dispatch) {
    dispatch(requestUpcomingOrganized());


    return api.getUpcomingOrganized()
      .then(json => {
        dispatch(receiveUpcomingOrganized(json));
      })
      .catch(err => {
        console.error('error getting upcoming organized events', err);
        dispatch(getUpcomingOrganizedError());
      });
  }
}

export function fetchUpcomingParticipations() {
  return function(dispatch) {
    dispatch(requestUpcomingParticipations());

    return api.getUpcomingParticipations()
      .then(json => {
        dispatch(receiveUpcomingParticipations(json));
      })
      .catch(err => {
        console.error('error getting upcoming participating events', err);
        dispatch(getUpcomingParticipationsError());
      });
  }
}

function requestUpcomingParticipations() {
  return { type: FETCHING_PARTICIPATIONS };
}

function receiveUpcomingParticipations(events) {
  return { type: FETCHING_PARTICIPATIONS_SUCCESS, events: events };
}

function getUpcomingParticipationsError() {
  return { type: FETCHING_PARTICIPATIONS_ERROR };
}

function requestUpcomingOrganized() {
  return { type: FETCHING_ORGANIZED };
}

function receiveUpcomingOrganized(events) {
  return { type: FETCHING_ORGANIZED_SUCCESS, events: events };
}

function getUpcomingOrganizedError() {
  return { type: FETCHING_ORGANIZED_ERROR };
}

// schedules
export function createSchedule(schedule, cb) {
  return function(dispatch) {
    dispatch(requestScheduleCreate());

    return api.createSchedule(schedule)
      .then(json => {
        console.warn('created!', json);
        dispatch(scheduleCreated(json));
        cb(null, json);
      })
      .catch(err => {
        console.error('error creating schedule', err);
        dispatch(createScheduleError(err));
        cb(err, null);
      });
  }
}

export function updateSchedule(schedule, cb) {
  return function(dispatch) {
    dispatch(requestScheduleUpdate());

    return api.updateSchedule(schedule)
      .then(json => {
        console.warn('updated!', json);
        dispatch(scheduleUpdated(json));
        cb(null, json);
      })
      .catch(err => {
        console.error('error updating schedule', err);
        dispatch(updateScheduleError(err));
        cb(err, null);
      });
  }
}

function requestScheduleCreate() {
  return {
    type: CREATING_SCHEDULE,
  };
}

function scheduleCreated(schedule) {
  return {
    type: CREATING_SCHEDULE_SUCCESS,
    schedule,
  };
}

function createScheduleError(error) {
  return {
    type: CREATING_SCHEDULE_ERROR,
    error,
  };
}

function requestScheduleUpdate() {
  return {
    type: UPDATING_SCHEDULE,
  };
}

function scheduleUpdated(schedule) {
  return {
    type: UPDATING_SCHEDULE_SUCCESS,
    schedule,
  };
}

function updateScheduleError(error) {
  return {
    type: UPDATING_SCHEDULE_ERROR,
    error,
  };
}

export function deleteSchedule(id) {
  return function(dispatch) {
    dispatch(requestScheduleDelete(id));

    return api.deleteSchedule(id)
      .then(json => {
        console.warn('deleted!', json);
        dispatch(scheduleDeleted(json));
      })
      .catch(err => {
        console.error('error getting schedule', err);
        dispatch(deleteScheduleError(id, err));
      });
  }
}

function requestScheduleDelete(id) {
  return {
    type: DELETING_SCHEDULE,
    id,
  };
}

function scheduleDeleted(schedule) {
  return {
    type: SCHEDULE_DELETED,
    schedule,
  };
}

function deleteScheduleError(id, error) {
  return {
    type: DELETE_SCHEDULE_ERROR,
    id,
    error,
  };
}

export function fetchSchedule(id) {
  return function(dispatch) {
    dispatch(requestSchedule(id));

    return api.getSchedule(id)
      .then(json => {
        console.warn('fetched!', json);
        dispatch(receiveSchedule(json));
      })
      .catch(err => {
        console.error('error getting schedule', err);
        dispatch(getScheduleError(id, err));
      });
  }
}

function requestSchedule(id) {
  return {
    type: FETCHING_SCHEDULE,
    id,
  };
}

export function fetchSchedules(start, end) {
  return function(dispatch) {
    dispatch(requestSchedules(start, end));

    return api.getSchedules(start, end)
      .then(json => {
        dispatch(receiveSchedules(json));
      })
      .catch(err => {
        console.error('error getting schedules', err);
        dispatch(getSchedulesError(start, end, err));
      });
  }
}

function requestSchedules(start, end) {
  return {
    type: FETCHING_SCHEDULES,
    start,
    end,
  };
}

function receiveSchedule(schedule) {
  return {
    type: FETCH_SCHEDULE_SUCCESS,
    schedule,
  };
}

function getScheduleError(id, error) {
  return {
    type: FETCH_SCHEDULE_ERROR,
    id,
    error,
  };
}

function receiveSchedules(schedules) {
  return {
    type: FETCHING_SCHEDULES_SUCCESS,
    schedules,
  };
}

function getSchedulesError(start, end, error) {
  return {
    type: GET_SCHEDULES_ERROR,
    start,
    end,
    error,
  };
}

// bookings
export function fetchBooking(id) {
  return (dispatch) => {
    dispatch(tryFetchBooking(id));

    return api.fetchBooking(id)
      .then(json => {
        console.log('got booking?', json);
        dispatch(bookingFetched(json));
      })
      .catch(err => {
        console.error('Error fetching booking', err);
        dispatch(fetchBookingError(id, err));
      });
  };
}

function tryFetchBooking(id) {
  return { type: FETCHING_BOOKING, id };
}

function bookingFetched(booking) {
  return { type: BOOKING_FETCHED, booking };
}

function fetchBookingError(id, err) {
  return { type: FETCH_BOOKING_ERROR, id, err };
}

export function addNoteToBooking(id, note, cb) {
  return function(dispatch) {
    dispatch(tryAddNoteToBooking(id, note));

    return api.addNoteToBooking(id, note)
      .then(json => {
        console.log('got json', json);
        dispatch(bookingUpdated(json));
        if (cb) {
          cb(json);
        }
      })
      .catch(err => {
        console.error('Error adding note to booking', err);
        dispatch(updateBooking({id}, err));
      })
  }
}

function tryAddNoteToBooking(id, note) {
  return { type: ADDING_NOTE_TO_BOOKING, id, note};
}

export function updateBooking(booking, cb) {
  return function(dispatch) {
    dispatch(tryUpdateBooking(booking));

    return api.updateBooking(booking)
      .then(json => {
        console.log('got json', json);
        dispatch(bookingUpdated(json));
        if (cb) {
          cb(json);
        }
      })
      .catch(err => {
        console.error('Error updating booking', err);
        dispatch(updateBookingError(booking, err));
      });
  };
}

function tryUpdateBooking(booking) {
  return { type: BOOKING_UPDATING, booking };
}

function updateBookingError(booking, error) {
  return { type: BOOKING_UPDATE_ERROR, booking, error };
}

function bookingUpdated(booking) {
  return { type: BOOKING_UPDATED, booking };
}

export function createBlock(block, slot, cb) {
  return function(dispatch) {
    dispatch(tryCreateBlock());

    return api.createBlock(block)
      .then(json => {
        dispatch(blockCreated(block, slot));

        if (cb) {
          cb(null, json);
        }
      })
      .catch(err => {
        console.error('error creating block', err);
        dispatch(createBlockError(err));
        cb(err, null);
      });
  }
}

function tryCreateBlock(block) {
  return { type: TRY_CREATE_BLOCK, block };
}

function blockCreated(block, slot) {
  return { type: BLOCK_CREATED, block, slot };
}

function createBlockError(error) {
  return { type: CREATE_BLOCK_ERROR, error };
}

export function createBooking(booking, slot, cb) {
  return function(dispatch) {
    dispatch(tryCreateBooking());

    return api.createBooking(booking)
      .then(json => {
        dispatch(bookingCreated(json, slot));

        if (cb) {
          cb(null, json);
        }
      })
      .catch(err => {
        console.error('error creating booking', err);
        dispatch(createBookingError(err));
        cb(err, null);
      });
  }
}

function tryCreateBooking(booking) {
  return { type: TRY_CREATE_BOOKING, booking };
}

function bookingCreated(booking, slot) {
  return { type: BOOKING_CREATED, booking, slot };
}

function createBookingError(error) {
  return { type: CREATE_BOOKING_ERROR, error };
}

export function fetchBookings(start, end) {
  return function(dispatch) {
    dispatch(requestBookings(start, end));

    return api.getBookings2(new Date(start).getTime(), new Date(end).getTime(), false)
      .then(json => {
        dispatch(receiveBookings(json));
      })
      .catch(err => {
        if (err.message && err.message === 'cancelled') {
          console.error('cancellation...');
        } else {
          console.error('error getting bookings', err);
          dispatch(getBookingsError());
        }
      });
  }
}

function requestBookings(start, end) {
  return { type: FETCHING_BOOKINGS, start, end };
}

function receiveBookings(bookings) {
  return { type: FETCHING_BOOKINGS_SUCCESS, bookings };
}

function getBookingsError() {
  return { type: FETCHING_BOOKINGS_ERROR };
}

// event search
export function searchEvents(start, end) {
  return function(dispatch) {
    dispatch(requestEvents(start, end));

    return api.getAvailableEvents(start, end)
      .then(json => {
        dispatch(receiveEvents(json));
      })
      .catch(err => {
        console.error('error getting events', err);
        dispatch(getEventsError());
      });
  }
}

function requestEvents(start, end) {
  return { type: FETCHING_EVENTS, start: start, end: end };
}

function receiveEvents(events) {
  return { type: FETCHING_EVENTS_SUCCESS, events: events };
}

function getEventsError() {
  return { type: FETCHING_EVENTS_ERROR };
}