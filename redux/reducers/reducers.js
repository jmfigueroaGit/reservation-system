import { combineReducers } from 'redux';

import {
	registerReducer,
	loadedUserReducer,
	findEmailReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
} from './userReducer';

const reducer = combineReducers({
	register: registerReducer,
	loadedUser: loadedUserReducer,
	findEmail: findEmailReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
});

export default reducer;
