import {
	EVENT_CREATE_REQUEST,
	EVENT_CREATE_SUCCESS,
	EVENT_CREATE_FAILED,
	EVENT_GET_REQUEST,
	EVENT_GET_SUCCESS,
	EVENT_GET_FAILED,
	EVENT_SINGLE_REQUEST,
	EVENT_SINGLE_SUCCESS,
	EVENT_SINGLE_FAILED,
	USER_EVENTS_REQUEST,
	USER_EVENTS_SUCCESS,
	USER_EVENTS_FAILED,
} from '@/constants/eventConstant';
import axios from 'axios';

export const createEvent = (eventData) => async (dispatch) => {
	try {
		dispatch({ type: EVENT_CREATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/events', eventData, config);

		dispatch({
			type: EVENT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EVENT_CREATE_FAILED,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEvents = () => async (dispatch) => {
	try {
		dispatch({ type: EVENT_GET_REQUEST });

		const { data } = await axios.get('/api/events');

		dispatch({
			type: EVENT_GET_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EVENT_GET_FAILED,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEvent = (id) => async (dispatch) => {
	try {
		dispatch({ type: EVENT_SINGLE_REQUEST });

		const { data } = await axios.get(`/api/events/${id}`);

		dispatch({
			type: EVENT_SINGLE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EVENT_SINGLE_FAILED,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const userEvents = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_EVENTS_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/events/user-event', { id }, config);

		dispatch({
			type: USER_EVENTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_EVENTS_FAILED,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
