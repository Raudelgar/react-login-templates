import axios from 'axios';
import queryString from 'query-string';

export function fetchGithubCode() {
	return axios
		.get('/gh-client')
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
		.post('/gh-token', { params: { code } })
		.then((response) => fetchGithubToken(response.data))
		.then((res) => res.data)
		.catch((error) => console.log(error));
}

function fetchGithubToken(params) {
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
