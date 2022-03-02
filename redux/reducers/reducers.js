import { combineReducers } from 'redux';

import {
	registerReducer,
	loadedUserReducer,
	findEmailReducer,
	findByIdReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
} from './userReducer';
import { createEventReducer, getEventsReducer } from './eventReducer';

const reducer = combineReducers({
	register: registerReducer,
	loadedUser: loadedUserReducer,
	findEmail: findEmailReducer,
	findById: findByIdReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	createEvent: createEventReducer,
	getEvents: getEventsReducer,
});

export default reducer;
