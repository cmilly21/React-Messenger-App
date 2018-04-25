import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FormsPage from '../forms/FormsPage'
import MessagePage from '../message/MessagePage'

export default function App() {
	return (
		<div className='App' >
			<Switch>
				<Route path='/' exact component={ FormsPage } />
				<Route path='/message' component={ MessagePage } />
			</Switch>
		</div>
	);
}