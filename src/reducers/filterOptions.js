import {
  CHANGE_DATE_INTERVAL,
} from '../constants/actionTypes';

const initialState = {
  dateInterval: 1,
};

export default function filterOptions(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE_INTERVAL:
      return Object.assign({}, state, {
        dateInterval: action.dateInterval,
      });
    default:
      return state;
  }
}