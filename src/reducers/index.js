import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';
import bookings from './bookings';
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
});

export default rootReducer;