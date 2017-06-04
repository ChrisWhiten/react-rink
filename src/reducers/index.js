import { combineReducers } from 'redux';
import invitations from './invitations';

const rootReducer = combineReducers({
	invitations,
});

export default rootReducer;