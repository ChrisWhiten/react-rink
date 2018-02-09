import {
  FETCHING_BOOKINGS,
  FETCHING_BOOKINGS_ERROR,
  FETCHING_BOOKINGS_SUCCESS,
  BOOKING_CREATED,
  CREATE_BOOKING_ERROR,
  SLOT_CREATED,
  BLOCK_CREATED,
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

    case BLOCK_CREATED:
      // TODO this is almost identical to BOOKING_CREATED. refactor opportunity
      const newBlock = action.block;
      const stateWithNewBlock = Object.assign({}, state);
      let newBlockTime = moment(newBlock.start);
      newBlockTime.set({
        second: 0,
        millisecond: 0,
      });

      stateWithNewBlock.items.forEach(location => {
        if (location.locationID === newBlock.locationId) {
          location.bookings.forEach(s => {
            let slotTime = moment(s.time);
            slotTime.set({
              second: 0,
              millisecond: 0,
            });
            if (s.availabilitySlot && ((s.availabilitySlot.id === action.slot.id) || newBlockTime.isSame(slotTime))) {
              if (!s.availabilitySlot.blocks) {
                s.availabilitySlot.blocks = [];
              }

              s.availabilitySlot.blocks.push(newBlock);
            }
          });
        }
      });

      stateWithNewBlock.error = null;

      return stateWithNewBlock;

    case BOOKING_CREATED:
      const newBooking = action.booking;
      const newState = Object.assign({}, state);
      let newBookingTime = moment(newBooking.start);
      newBookingTime.set({
        second: 0,
        millisecond: 0,
      });

      newState.items.forEach(location => {
        if (location.locationID === newBooking.locationId) {
          location.bookings.forEach(s => {
            let slotTime = moment(s.time);
            slotTime.set({
              second: 0,
              millisecond: 0,
            });
            if (s.availabilitySlot && ((s.availabilitySlot.id === action.slot.id) || newBookingTime.isSame(slotTime))) {
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