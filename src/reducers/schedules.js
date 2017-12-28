import {
  FETCHING_SCHEDULES,
  GET_SCHEDULES_ERROR,
  FETCHING_SCHEDULES_SUCCESS,
} from '../constants/actionTypes';

let initialStart = new Date();
initialStart.setHours(0, 0, 0, 0); // midnight this morning
let initialEnd = new Date(2040, 11, 0); // random future point in time

const initialState = {
  isFetching: false,
  items: [],
  start: initialStart,
  end: initialEnd,
};

export default function schedules(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SCHEDULES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_SCHEDULES_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case FETCHING_SCHEDULES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.schedules,
      });
    default:
      return state;
  }
};