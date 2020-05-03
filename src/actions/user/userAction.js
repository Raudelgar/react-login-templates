import { LOAD_USER, LOGOUT } from '../types.js';

export function setUserAction(user) {
	return {
		type: LOAD_USER,
		payload: user,
	};
}

export function cleanUserAction() {
	return {
		type: LOGOUT,
	};
}
