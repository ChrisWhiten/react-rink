import {
  FETCHING_WALKINS,
  FETCHING_WALKINS_SUCCESS,
  FETCHING_WALKINS_ERROR,
  BOOKING_CREATED,
  SLOT_CREATED,
} from '../constants/actionTypes';
import moment from 'moment';

const initialState = {
  isFetching: false,
  items: [],
  start: new Date(),
};

export default function walkins(state = initialState, action) {
  switch (action.type) {
    case FETCHING_WALKINS:
      return Object.assign({}, state, {
        isFetching: true,
        start: action.start,
      });

    case SLOT_CREATED:
      let postSlotCreatedState = Object.assign({}, state);
      console.warn('state...', postSlotCreatedState);
      console.warn('action...', action);
      // looping over locations
      for (let i = 0; i < postSlotCreatedState.items.length; i++) {
        console.log(postSlotCreatedState.items[i].locationID, action.slot.locationId)
        if (postSlotCreatedState.items[i].locationID !== action.slot.locationId) {
          continue;
        }
        // looping over bookings
        for (let j = 0; j < postSlotCreatedState.items[i].bookings.length; j++) {
          if (moment(postSlotCreatedState.items[i].bookings[j].time).isSame(action.slot.startTime)) {
            console.error('found a match!!!!', postSlotCreatedState.items[i].bookings[j]);
            postSlotCreatedState.items[i].bookings[j].availabilitySlot = action.slot;
            break;
          }
        }
      }

      console.log("returning from walkins reducer", postSlotCreatedState);
      return postSlotCreatedState;
    // case BOOKING_CREATED:
    //   const newBooking = action.booking;
    //   const slot = action.slot;
    //   const newState = Object.assign({}, state);
    //   newState.items.forEach(location => {
    //     if (location.locationID === newBooking.locationId) {
    //       location.bookings.forEach(s => {
    //         if (s.availabilitySlot && s.availabilitySlot.id === slot.id) {
    //         // if (s.id === slot.id) {
    //           if (!s.availabilitySlot.bookings) {
    //             s.availabilitySlot.bookings = [];
    //           }

    //           s.availabilitySlot.bookings.push(newBooking);
    //         }
    //       });
    //     }
    //   });

    //   return newState;

    case FETCHING_WALKINS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.bookings,
        start: action.start,
      });
    case FETCHING_WALKINS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}