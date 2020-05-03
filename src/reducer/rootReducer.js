import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import userReducer from './userReducer';

const STATE = {
	authUserId: authUserReducer,
	user: userReducer,
};

export default combineReducers(STATE);
