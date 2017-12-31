import {
  FETCHING_LOCATIONS,
  FETCHING_LOCATIONS_ERROR,
  FETCHING_LOCATIONS_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCHING_LOCATIONS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case FETCHING_LOCATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.locations,
      });
    default:
      return state;
  }
}