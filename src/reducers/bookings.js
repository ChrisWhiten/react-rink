import {
  FETCHING_BOOKINGS,
  FETCHING_BOOKINGS_ERROR,
  FETCHING_BOOKINGS_SUCCESS,
} from '../constants/actionTypes';

let initialStart = new Date();
initialStart.setHours(0, 0, 0, 0); // midnight this morning
let initialEnd = new Date();
initialEnd.setHours(23, 59, 59, 999); // end of day

const initialState = {
  isFetching: false,
  items: [],
  start: initialStart,
  end: initialEnd,
};

export default function bookings(state = initialState, action) {
  switch (action.type) {
    case FETCHING_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCHING_BOOKINGS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case FETCHING_BOOKINGS_SUCCESS:
      console.log('booking time', action.bookings);
      return Object.assign({}, state, {
        isFetching: false,
        items: action.bookings,
      });
    default:
      return state;
  }
}