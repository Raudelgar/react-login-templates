import axios from 'axios';
import queryString from 'query-string';
import { SERVER_PROXY_DEV, SERVER_PROXY_PROD } from '../config/env.js';

let serverProxyUrl =
	process.env.NODE_ENV === 'production' ? SERVER_PROXY_PROD : SERVER_PROXY_DEV;

export function fetchGithubCode() {
	return axios
		.get(`${serverProxyUrl}/gh-client`)
		.then((response) => {
			if (response.status >= 200 || response.status < 300) {
				return response.data;
			} else {
				return false;
			}
		})
		.catch((error) => console.log(error));
}

export function fetchGithubUser(code) {
	return axios
		.post(`${serverProxyUrl}/gh-token`, { params: { code } })
		.then((response) => fetchWithToken(response.data))
		.then((res) => res.data)
		.catch((error) => console.log(error));
}

function fetchWithToken(params) {
	window.localStorage.setItem('gh-params', params);
	return getUser(params);
}

export function getUser(params) {
	const resParams = queryString.parse(params);
	const url = `https://api.github.com/user?${resParams.scope}`;
	const config = {
		url,
		method: 'get',
		headers: {
			Authorization: `${resParams.token_type} ${resParams.access_token}`,
		},
	};

	return axios(config);
}
