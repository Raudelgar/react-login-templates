import { AUTH_PARAMS } from '../types.js';

export default function authUserAction(params) {
	window.localStorage.setItem('gh-params', JSON.stringify(params));
	return {
		type: LOGIN,
		payload: params,
	};
}
