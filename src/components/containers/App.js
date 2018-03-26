import React, { Component } from 'react';
import AuthDashboard from './AuthDashboard';
import MessageDashboard from './MessageDashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {

	state = {}

	render() {
		return (

			<BrowserRouter>
				<div className='App'>
					<Switch>
						<Route path='/login' component={ AuthDashboard } />
						<Route path='/' component={ MessageDashboard } />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;