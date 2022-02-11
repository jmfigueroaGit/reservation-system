import axios from 'axios';
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
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILED,
	USER_UPDATE_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	CLEAR_ERROR,
} from '@/constants/userConstant';

//  Register user
export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/user', userData, config);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Loaded user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: USER_LOAD_REQUEST });

		const { data } = await axios.get('/api/me');

		dispatch({
			type: USER_LOAD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LOAD_FAILED,
			payload: error.response.data.message,
		});
	}
};

//Find Email
export const findUserEmail = (email) => async (dispatch) => {
	try {
		dispatch({ type: FIND_EMAIL_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/password/forgot',
			{ email },
			config
		);

		dispatch({
			type: FIND_EMAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FIND_EMAIL_FAILED,
			payload: error.response.data.message,
		});
	}
};

//Forgot Password
export const sendPasswordLink = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/password/reset', { email }, config);

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAILED,
			payload: error.response.data.message,
		});
	}
};

export const newPassword = (token, password) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(
			`/api/password/reset/${token}`,
			{ password },
			config
		);

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERROR,
	});
};
