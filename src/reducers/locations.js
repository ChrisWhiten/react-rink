import {
  FETCHING_LOCATIONS,
  FETCHING_LOCATIONS_ERROR,
  FETCHING_LOCATIONS_SUCCESS,
  CHANGE_SELECTED_LOCATIONS,
  LOAD_PAGE,
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
  selectedLocations: [],
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAGE:
      let newSelectedLocation;
      switch (action.pageName) {
        case 'booking': {
          newSelectedLocation = [];
          break;
        }
        case 'external': {
          newSelectedLocation = null;
          break;
        }
        default:
          newSelectedLocation = [];
      }

      console.log('sending..', newSelectedLocation, action);

      return Object.assign({}, state, {
        selectedLocations: newSelectedLocation,
      });
    case CHANGE_SELECTED_LOCATIONS:
      return Object.assign({}, state, {
        selectedLocations: action.locations,
      });
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