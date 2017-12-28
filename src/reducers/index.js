import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';
import bookings from './bookings';
import schedules from './schedules';

const rootReducer = combineReducers({
	invitations,
	events,
	bookings,
	schedules,
});

export default rootReducer;