import {
  FETCHING_SCHEDULE,
  GET_SCHEDULES_ERROR,
  FETCH_SCHEDULE_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  schedule: undefined,
};

export default function schedule(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SCHEDULE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_SCHEDULES_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case FETCH_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schedule: action.schedule,
      });
    default:
      return state;
  }
};