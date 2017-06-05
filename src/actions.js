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