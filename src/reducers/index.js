import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';
import bookings from './bookings';
import booking from './booking';
import walkins from './walkins';
import schedules from './schedules';
import schedule from './schedule';
import locations from './locations.js';
import filterOptions from './filterOptions.js';

const rootReducer = combineReducers({
	invitations,
	events,
	bookings,
	schedules,
	schedule,
	locations,
	booking,
	walkins,
	filterOptions,
});

export default rootReducer;