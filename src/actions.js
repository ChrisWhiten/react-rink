import {
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
} from './constants/actionTypes'

// action creators
export function declineInvitation(invitationId) {
  console.log('declining invitation', invitationId);
  return { type: DECLINE_INVITATION, id: invitationId };
}

export function acceptInvitation(invitationId) {
  return { type: ACCEPT_INVITATION, id: invitationId };
}