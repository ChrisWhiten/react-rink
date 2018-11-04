import {
  FETCH_BOOKING_ERROR,
  BOOKING_FETCHED,
  FETCHING_BOOKING,
  BOOKING_UPDATED,
  ADDED_PAYMENT_TO_CURRENT_BOOKING
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  item: undefined
};

export default function booking(state = initialState, action) {
  switch (action.type) {
    case FETCHING_BOOKING:
      return Object.assign({}, state, {
        isFetching: true
      });

    case BOOKING_UPDATED:
    case BOOKING_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.booking
      });

    case ADDED_PAYMENT_TO_CURRENT_BOOKING:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.updatedBooking
      });
    case FETCH_BOOKING_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
