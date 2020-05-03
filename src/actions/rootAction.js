import { setUserAction, cleanUserAction } from './user/userAction';
import { authUserLogAction, authUserLogOutAction } from './auth/authUserAction';

export default function handleInitalData(user) {
	return (dispatch) => {
		dispatch(authUserLogAction(user.login));
		dispatch(setUserAction(user));
	};
}

export function handleLogoutAction() {
	return (dispatch) => {
		dispatch(authUserLogOutAction());
		dispatch(cleanUserAction());
	};
}
