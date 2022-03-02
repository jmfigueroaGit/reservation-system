import {
	EVENT_CREATE_REQUEST,
	EVENT_CREATE_SUCCESS,
	EVENT_CREATE_FAILED,
	EVENT_GET_REQUEST,
	EVENT_GET_SUCCESS,
	EVENT_GET_FAILED,
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
