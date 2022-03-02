import {
	EVENT_CREATE_REQUEST,
	EVENT_CREATE_SUCCESS,
	EVENT_CREATE_FAILED,
	EVENT_GET_REQUEST,
	EVENT_GET_SUCCESS,
	EVENT_GET_FAILED,
	EVENT_GET_RESET,
	CLEAR_ERROR,
} from '@/constants/eventConstant';

export const createEventReducer = (state = { event: null }, action) => {
	switch (action.type) {
		case EVENT_CREATE_REQUEST:
			return {
				loading: true,
			};
		case EVENT_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				event: action.payload,
			};
		case EVENT_CREATE_FAILED:
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

export const getEventsReducer = (state = { events: [] }, action) => {
	switch (action.type) {
		case EVENT_GET_REQUEST:
			return {
				loading: true,
			};
		case EVENT_GET_SUCCESS:
			return {
				loading: false,
				success: true,
				events: action.payload.events,
			};
		case EVENT_GET_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case EVENT_GET_RESET:
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
