import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { HomeWrapper } from './HomeWrapper.js';
import { handleLogoutAction } from '../../actions/rootAction.js';

export default function Home() {
	const authUserId = useSelector((state) => state.authUserId);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => dispatch(handleLogoutAction());

	if (!authUserId) {
		return <Redirect to='/login' />;
	} else {
		return (
			<HomeWrapper>
				<div className='container'>
					<button onClick={handleLogout}>Logout</button>
					<div className='content'>
						<img src={user.avatar_url} alt={`Avatar for ${user.name}`} />
						<span>{user.name}</span>
						<span>{user.public_repos} Repos</span>
						<span>{user.followers} Followers</span>
						<span>{user.following} Following</span>
					</div>
				</div>
			</HomeWrapper>
		);
	}
}
