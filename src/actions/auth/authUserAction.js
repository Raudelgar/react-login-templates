import { LOGIN, LOGOUT } from '../types.js';

export function authUserLogAction(userId) {
	window.localStorage.setItem('gh-userId', userId);
	return {
		type: LOGIN,
		payload: userId,
	};
}

export function authUserLogOutAction() {
	window.localStorage.clear();
	return {
		type: LOGOUT,
	};
}
