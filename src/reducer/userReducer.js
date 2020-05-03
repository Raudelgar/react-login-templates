import { LOAD_USER, LOGOUT } from '../actions/types.js';

export default function userReducer(state = {}, { type, payload }) {
	switch (type) {
		case LOAD_USER:
			return {
				...state,
				...payload,
			};
		case LOGOUT:
			return {};
		default:
			return state;
	}
}
