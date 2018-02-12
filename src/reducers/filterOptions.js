import {
  CHANGE_DATE_INTERVAL,
  LOAD_PAGE,
} from '../constants/actionTypes';

const initialState = {
  dateInterval: 1,
};

export default function filterOptions(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAGE:
      return Object.assign({}, state, {
        dateInterval: 1,
      });
    case CHANGE_DATE_INTERVAL:
      return Object.assign({}, state, {
        dateInterval: action.dateInterval,
      });
    default:
      return state;
  }
}