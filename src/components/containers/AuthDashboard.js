import React, { Component } from 'react';
import '../../css/forms.css';
import LogInForm from '../Forms/LogInForm';
import SignUpForm from '../Forms/SignUpForm';
import Redirect from 'react-router-dom/Redirect';
import axios from 'axios';

class AuthDashboard extends Component {

	state = {
		errMsg: '',
		isUserLoggedIn: false,
		isLoginForm: true,
	}

	componentWillMount() {
		this.checkUserLoggedIn();
	}

	checkUserLoggedIn = () => {
		let token = localStorage.getItem('token');
		//console.log(token);
		if (!token) {
			console.log('No token found in local storage');
			return;
		}
		axios.get('http://localhost:8080/users/' + token)
			.then((res) => {
				console.log(res);
				this.setState({
					isUserLoggedIn: true,
					user: {
						username: res.data.usernaame,
					}
				});
			})
			.catch((err) => {
				let errMsg = err.response.data;
				console.log(errMsg);
				// this.setState({
				// 	isUserLoggedIn: false,
				// });
			});
	}

	handleFormSwitch = (e) => {
		e.preventDefault();
		this.setState({
			errMsg: '',
			isLoginForm: !this.state.isLoginForm,
		});
	}

	handleSuccess = (token) => {
		localStorage.setItem('token', token);
		this.setState({
			isUserLoggedIn: true,
		});
	}

	handleFailure = (err) => {
		let errMsg = err.response.data.message;
		console.log(errMsg);
		this.setState({
			errMsg: errMsg,
		})
	}

	render() {
		if (this.state.isUserLoggedIn) {
			return <Redirect to='/' />;
		}
		return (
			<div className='formDashboardContainer'>
				<div className='formAppTitle'>
					<h1>Message App</h1>
				</div>
				{
					this.state.isLoginForm ?
						<LogInForm
							switchForm={ this.handleFormSwitch }
							handleSuccess={ this.handleSuccess }
							handleFailure={ this.handleFailure }
							errMsg={ this.state.errMsg }
						/>
						:
						<SignUpForm
							switchForm={ this.handleFormSwitch }
							handleSuccess={ this.handleSuccess }
							handleFailure={ this.handleFailure }
							errMsg={ this.state.errMsg }
						/>
				}
			</div>
		);
	}

}

export default AuthDashboard;