import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import GithubIcon from 'mdi-react/GithubIcon';
import { LoginWrapper } from './LoginWrapper.js';
import { fetchGithubCode, fetchGithubUser } from '../../api/api.js';
import AuthContext from '../../context/AuthContext.js';

export default function Login(props) {
	const { state, dispatch } = useContext(AuthContext);
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessages] = useState('');

	useEffect(() => {
		const { code } = queryString.parse(window.location.search);

		if (code) {
			//get access__token and user data
			fetchGithubUser(code)
				.then((res) => {
					if (res) {
						const user = {
							avatar_url: res.avatar_url,
							name: res.name,
							public_repos: res.public_repos,
							followers: res.followers,
							following: res.following,
							login: res.login,
						};
						dispatch({ type: 'LOGIN', payload: { user, isLoggedIn: true } });
						return () => setLoading(false);
					}
				})
				.catch((error) => {
					setErrorMessages(error);
					setLoading(false);
				});
		}
	}, [isLoading, dispatch]);

	const handleUserLogin = () => {
		console.log('user clicked to login');
		setLoading(true);

		fetchGithubCode().then((res) => {
			if (res) {
				const { url, scope, client_id } = res;
				const redirect_uri = window.location.href;
				const params = queryString.stringify({
					scope,
					client_id,
					redirect_uri,
				});
				const authUrl = `${url}?${params}`;
				window.location.assign(authUrl);
			}
		});
	};

	if (state.user) {
		return <Redirect to='/' />;
	}

	return (
		<LoginWrapper>
			<section className='container'>
				<div>
					<h1>Welcome</h1>
					<span>{errorMessage}</span>
					<div className='login-container'>
						{isLoading ? (
							<div className='loader-container'>
								<div className='loader'></div>
							</div>
						) : (
							<button className='login-link' onClick={handleUserLogin}>
								<GithubIcon />
								<span>Login with Github</span>
							</button>
						)}
					</div>
				</div>
			</section>
		</LoginWrapper>
	);
}

/* 
`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
*/
