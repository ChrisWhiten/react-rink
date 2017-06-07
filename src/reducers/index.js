import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';
import bookings from './bookings';

const rootReducer = combineReducers({
	invitations,
	events,
	bookings,
});

export default rootReducer;