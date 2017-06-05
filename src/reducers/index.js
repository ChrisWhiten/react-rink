import { combineReducers } from 'redux';
import invitations from './invitations';
import events from './events';

const rootReducer = combineReducers({
	invitations,
	events,
});

export default rootReducer;