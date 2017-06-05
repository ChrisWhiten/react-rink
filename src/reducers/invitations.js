import {
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
  FETCHING_INVITATIONS,
  FETCHING_INVITATIONS_ERROR,
  FETCHING_INVITATIONS_SUCCESS,
} from '../constants/actionTypes';

// const initialState = [];
const initialState = {
  isFetching: false,
  items: [],
};

export default function invitations(state = initialState, action) {
  switch (action.type) {
    case ACCEPT_INVITATION:
      return state;
    case DECLINE_INVITATION:
      return Object.assign({}, state, {
        items: state.items.filter(invite => invite.id !== action.id),
      });
    case FETCHING_INVITATIONS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCHING_INVITATIONS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case FETCHING_INVITATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.invitations,
      });
    default:
      return state;
  }
}