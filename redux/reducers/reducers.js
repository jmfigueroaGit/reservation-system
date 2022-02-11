import { combineReducers } from 'redux';

import {
	registerReducer,
	loadedUserReducer,
	findEmailReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
} from './userReducer';
import { createEventReducer } from './eventReducer';

const reducer = combineReducers({
	register: registerReducer,
	loadedUser: loadedUserReducer,
	findEmail: findEmailReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	createEvent: createEventReducer,
});

export default reducer;
