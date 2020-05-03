import { LOGIN, LOGOUT } from '../actions/types.js';

export default function authUserReducer(state = '', { type, payload }) {
	switch (type) {
		case LOGIN:
			return payload;
		case LOGOUT:
			return '';
		default:
			return state;
	}
}
