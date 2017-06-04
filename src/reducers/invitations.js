import {
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
} from '../constants/actionTypes';

// const initialState = [];
const initialState = [{
  id: 'oifejw',
  eventId: 'oijgreoijer',
  datetime: new Date() + (1000 * 60 * 60 * 24 * 5),
  venueId: 'jpofe',
  venueName: 'SF Arena',
  eventTypeName: 'Pickup hockey',
  position: 'Skater',
  inviter: 'Joe Smith',
  price: 17.3
}, {
  id: 'iojriejoje',
  eventId: 'fwwfwefwef',
  datetime: new Date() + (1000 * 60 * 60 * 24),
  venueId: 'fweef',
  venueName: 'Test Center',
  eventTypeName: 'Pickup hockey',
  position: 'Skater',
  inviter: 'Wayne Simmonds',
  price: 11.75
}];

export default function invitations(state = initialState, action) {
  switch (action.type) {
    case ACCEPT_INVITATION:
      return state;
    case DECLINE_INVITATION:
      return state.filter(invite => invite.id !== action.id);
    default:
      return state;
  }
}