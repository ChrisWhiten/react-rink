import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';
import bookings from './bookings';
import booking from './booking';
import walkins from './walkins';
import schedules from './schedules';
import schedule from './schedule';
import locations from './locations.js';

const rootReducer = combineReducers({
	invitations,
	events,
	bookings,
	schedules,
	schedule,
	locations,
	booking,
	walkins,
});

export default rootReducer;