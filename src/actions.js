import {
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
  FETCHING_INVITATIONS,
  FETCHING_INVITATIONS_ERROR,
  FETCHING_INVITATIONS_SUCCESS,
} from './constants/actionTypes';

import api from './data/api';

// action creators
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