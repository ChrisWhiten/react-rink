import {
  FETCHING_LOCATIONS,
  FETCHING_LOCATIONS_ERROR,
  FETCHING_LOCATIONS_SUCCESS,
  CHANGE_SELECTED_LOCATIONS,
  CHANGE_BOOKING_PAGE_SELECTED_LOCATIONS,
  // LOAD_PAGE,
  // CHANGE_DATE_INTERVAL,
  CHANGE_BOOKING_PAGE_DATE_INTERVAL
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
  selectedLocations: null,
  bookingPageSelectedLocations: []
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    // case LOAD_PAGE:
    //   let newSelectedLocation;
    //   switch (action.pageName) {
    //     case 'booking': {
    //       newSelectedLocation = [];
    //       break;
    //     }
    //     case 'external': {
    //       newSelectedLocation = null;
    //       break;
    //     }
    //     default:
    //       newSelectedLocation = [];
    //   }

    //   console.log('sending..', newSelectedLocation, action);

    //   return Object.assign({}, state, {
    //     selectedLocations: newSelectedLocation
    //   });
    case CHANGE_BOOKING_PAGE_DATE_INTERVAL:
      const dateInterval = action.dateInterval;
      let changedSelectedLocation;
      if (Array.isArray(state.bookingPageSelectedLocations)) {
        if (dateInterval === 1) {
          // already an array, we are fine
          // do nothing here
          changedSelectedLocation = state.bookingPageSelectedLocations;
        } else {
          // moving to multi-date but selectedLocations was previously an array
          if (state.bookingPageSelectedLocations.length > 0) {
            // pick the first from the list, since we will only render 1 location
            changedSelectedLocation = state.bookingPageSelectedLocations[0];
          } else {
            // we need a value for the location picker
            changedSelectedLocation = {
              locationId: state.items[0].id,
              locationName: state.items[0].locationName
            };
          }
        }
      } else {
        // previous selectedLocations is not an array
        if (dateInterval === 1) {
          if (state.bookingPageSelectedLocations) {
            changedSelectedLocation = [state.bookingPageSelectedLocations];
          } else {
            changedSelectedLocation = [];
          }
        } else {
          // already not an array, we are fine
          // do nothing here
          changedSelectedLocation = state.bookingPageSelectedLocations;
        }
      }

      return Object.assign({}, state, {
        bookingPageSelectedLocations: changedSelectedLocation
      });

    case CHANGE_BOOKING_PAGE_SELECTED_LOCATIONS:
      return Object.assign({}, state, {
        bookingPageSelectedLocations: action.locations
      });
    case CHANGE_SELECTED_LOCATIONS:
      return Object.assign({}, state, {
        selectedLocations: action.locations
      });
    case FETCHING_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCHING_LOCATIONS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        isFetching: false
      });
    case FETCHING_LOCATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.locations
      });
    default:
      return state;
  }
}
