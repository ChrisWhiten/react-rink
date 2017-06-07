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
} from './constants/actionTypes';

import api from './data/api';

// action creators
////////////////////

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
        console.log('error getting invitations', err);
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
        console.log('error getting upcoming organized events', err);
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
        console.log('error getting upcoming participating events', err);
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

// bookings
export function fetchBookings(start, end) {
  return function(dispatch) {
    dispatch(requestBookings());

    return api.getBookings(start, end)
      .then(json => {
        dispatch(receiveBookings(json));
      })
      .catch(err => {
        console.log('error getting bookings', err);
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
        console.log('error getting events', err);
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