import {
  FETCHING_ORGANIZED,
  FETCHING_ORGANIZED_ERROR,
  FETCHING_ORGANIZED_SUCCESS,
  FETCHING_PARTICIPATIONS,
  FETCHING_PARTICIPATIONS_SUCCESS,
  FETCHING_PARTICIPATIONS_ERROR,
  FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  FETCHING_EVENTS_ERROR,
} from '../constants/actionTypes';

const initialState = {
  upcomingOrganized: {
    isFetching: false,
    items: [],
  },
  upcomingParticipations: {
    isFetching: false,
    items: [],
  },
  searchableEvents: {
    isFetching: false,
    items: [],
  },
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case FETCHING_EVENTS: 
      return Object.assign({}, state, {
        searchableEvents: {
          isFetching: true,
          items: state.searchableEvents.items,
        },
      });
    case FETCHING_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        searchableEvents: {
          isFetching: false,
          items: action.events,
        },
      });
    case FETCHING_EVENTS_ERROR: 
      return Object.assign({}, state, {
        searchableEvents: {
          isFetching: false,
          items: state.searchableEvents.items,
        },
      });
    case FETCHING_ORGANIZED:
      return Object.assign({}, state, {
        upcomingOrganized: {
          isFetching: true,
          items: state.upcomingOrganized.items,
        },
      });
    case FETCHING_ORGANIZED_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        upcomingOrganized: {
          isFetching: false,
          items: state.upcomingOrganized.items,
        },
      });
    case FETCHING_ORGANIZED_SUCCESS:
      return Object.assign({}, state, {
        upcomingOrganized: {
          isFetching: false,
          items: action.events,
        },
      });
    case FETCHING_PARTICIPATIONS:
      return Object.assign({}, state, {
        upcomingParticipations: {
          isFetching: true,
          items: state.upcomingParticipations.items,
        },
      });
    case FETCHING_PARTICIPATIONS_SUCCESS:
      return Object.assign({}, state, {
        upcomingParticipations: {
          isFetching: false,
          items: action.events,
        },
      });
    case FETCHING_PARTICIPATIONS_ERROR:
      console.log('no error handling right now...');
      return Object.assign({}, state, {
        upcomingParticipations: {
          isFetching: false,
          items: state.upcomingParticipations.items,
        },
      });
    default:
      return state;
  }
}