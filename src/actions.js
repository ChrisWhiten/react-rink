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
} from './constants/actionTypes';

import api from './data/api';

// action creators
////////////////////

// locations
export function fetchLocations() {
  return function(dispatch) {
    dispatch(requestLocations());

    return api.getLocations()
      .then(json => {
        console.log('get locations completed', json);
        dispatch(receiveLocations(json.data));
      })
      .catch(err => {
        console.error('error getting locations', err);
        dispatch(getLocationsError());
      });
  }
}

function requestLocations() {
  return { type: FETCHING_LOCATIONS };
}

function receiveLocations(locations) {
  console.log('received locations', locations);
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
export function createBooking(booking, cb) {
  return function(dispatch) {
    dispatch(tryCreateBooking());

    return api.createBooking(booking)
      .then(json => {
        console.log('uh...', json);
        dispatch(bookingCreated(json));

        if (cb) {
          cb(json);
        }
      })
      .catch(err => {
        console.error('error creating booking', err);
        dispatch(createBookingError());
      });
  }
}

function tryCreateBooking(booking) {
  return { type: TRY_CREATE_BOOKING, booking };
}

function bookingCreated(booking) {
  return { type: BOOKING_CREATED, booking };
}

function createBookingError() {
  return { type: CREATE_BOOKING_ERROR };
}

export function fetchBookings(start, end) {
  return function(dispatch) {
    dispatch(requestBookings());

    return api.getBookings2(start, end)
      .then(json => {
        dispatch(receiveBookings(json));
      })
      .catch(err => {
        console.error('error getting bookings', err);
        dispatch(getBookingsError());
      });
  }
}

function requestBookings(start, end) {
  return { type: FETCHING_BOOKINGS, start: start, end: end };
}

function receiveBookings(bookings) {
  return { type: FETCHING_BOOKINGS_SUCCESS, bookings: bookings };
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