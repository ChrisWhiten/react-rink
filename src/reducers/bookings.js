import {
  FETCHING_BOOKINGS,
  FETCHING_BOOKINGS_ERROR,
  FETCHING_BOOKINGS_SUCCESS,
  BOOKING_CREATED,
  CREATE_BOOKING_ERROR,
  SLOT_CREATED,
} from '../constants/actionTypes';
import moment from 'moment';

let initialStart = new Date();
initialStart.setHours(0, 0, 0, 0); // midnight this morning
let initialEnd = new Date();
initialEnd.setHours(23, 59, 59, 999); // end of day

const initialState = {
  isFetching: false,
  error: null,
  items: [],
  start: initialStart,
  end: initialEnd,
};

export default function bookings(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOKING_ERROR:
      console.error('booking error', action);
      return Object.assign({}, state, {
        isFetching: false,
      });

    case BOOKING_CREATED:
      const newBooking = action.booking;
      const slot = action.slot;
      const newState = Object.assign({}, state);
      newState.items.forEach(location => {
        if (location.locationID === newBooking.locationId) {
          location.bookings.forEach(s => {
            if (s.availabilitySlot && s.availabilitySlot.id === slot.id) {
            // if (s.id === slot.id) {
              if (!s.availabilitySlot.bookings) {
                s.availabilitySlot.bookings = [];
              }

              s.availabilitySlot.bookings.push(newBooking);
            }
          });
        }
      });

      newState.error = null;

      return newState;

    case SLOT_CREATED:
      const updatedState = Object.assign({}, state);
      for (let i = 0; i < state.items.length; i++) {
        if (updatedState.items[i].locationID === action.slot.locationId) {
          for (let j = 0; j < updatedState.items[i].bookings.length; j++) {
            if (moment(updatedState.items[i].bookings[j].time).isSame(new Date(action.slot.startTime))) {
              console.error('added yeaaaah!', updatedState.items[i].bookings[j])
              updatedState.items[i].bookings[j].availabilitySlot = action.slot;
              break;
            }
          }
          break;
        }
      }

      updatedState.error = null;
      return updatedState;
    case FETCHING_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCHING_BOOKINGS_ERROR:
      console.log('no error handling right now...', action);
      return Object.assign({}, state, {
        isFetching: false,
        error: 'bad news bears'
      });
    case FETCHING_BOOKINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.bookings,
        error: null,
      });
    default:
      return state;
  }
}