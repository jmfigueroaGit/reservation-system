import {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILED,
	USER_REGISTER_REQUEST,
	USER_LOAD_SUCCESS,
	USER_LOAD_FAILED,
	USER_LOAD_REQUEST,
	FIND_EMAIL_SUCCESS,
	FIND_EMAIL_FAILED,
	FIND_EMAIL_REQUEST,
	FIND_EMAIL_RESET,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_RESET,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_RESET,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILED,
	USER_UPDATE_REQUEST,
	CLEAR_ERROR,
} from '@/constants/userConstant';

// Register Reducer
export const registerReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return {
				loading: true,
			};
		case USER_REGISTER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case USER_REGISTER_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Load User Reducer
export const loadedUserReducer = (
	state = { loading: true, user: null },
	action
) => {
	switch (action.type) {
		case USER_LOAD_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case USER_LOAD_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				user: action.payload.user,
			};
		case USER_LOAD_FAILED:
			return {
				loading: false,
				isAuthenticated: false,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Find Email Reducer
export const findEmailReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case FIND_EMAIL_REQUEST:
			return {
				loading: true,
			};
		case FIND_EMAIL_SUCCESS:
			return {
				loading: false,
				status: action.payload,
			};
		case FIND_EMAIL_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case FIND_EMAIL_RESET:
			return {};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Forgot Password
export const forgotPasswordReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				loading: true,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				sent: action.payload,
			};
		case FORGOT_PASSWORD_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case FORGOT_PASSWORD_RESET:
			return {};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Reset Password
export const resetPasswordReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				reset: action.payload,
			};
		case RESET_PASSWORD_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case RESET_PASSWORD_RESET:
			return {};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
