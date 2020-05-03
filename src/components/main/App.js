import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.js';
import Home from '../home/Home.js';
import Login from '../auth/Login.js';
import { initialState, reducer } from '../../store/reducer/index.js';

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
