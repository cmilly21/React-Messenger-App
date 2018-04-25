import React, { Component } from 'react';
import '../../css/Forms.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Redirect } from 'react-router-dom';
import AuthService from '../../AuthService';

export default class FormsContainer extends Component {

	state = {
		errorMessage: null,
		isUserLoggedIn: false,
		isLoginForm: true,
		username: '',
		password: '',
		confirmPassword: '',
	}

	componentDidMount() {
		this.getUser();
	}

	async getUser() {
		try {
			const data = await AuthService.authUser();
			if (!data.auth) return;
			this.setState({ isUserLoggedIn: data.auth });

		} catch (err) {
			this.setState({ errorMessage: err.response.data })
		}
	}

	handleFormSwitch = (e) => {
		e.preventDefault();

		this.setState({
			errorMessage: null,
			isLoginForm: !this.state.isLoginForm,
			username: '',
			password: '',
			confirmPassword: ''
		});
	}

	handleFormSubmit = (e) => {
		e.preventDefault();

		const { username, password, confirmPassword, isLoginForm } = this.state;

		if (isLoginForm) {
			AuthService.userLogin(
				username,
				password,
				this.handleSubmitSuccess,
				this.handleSubmitFailure
			);
		} else {
			if (password !== confirmPassword) return this.setState({ errMsg: `Passwords don't match.` });

			AuthService.userSignUp(
				username,
				password,
				this.handleSubmitSuccess,
				this.handleSubmitFailure
			);
		}
	}

	handleInputChange = (e) => {
		e.preventDefault();

		this.setState({ [ e.target.name ]: e.target.value });
	}

	handleSubmitSuccess = () => {
		this.setState({ isUserLoggedIn: true });
	}

	handleSubmitFailure = (errMsg) => {
		console.log(errMsg);
		this.setState({ errorMessage: errMsg });
	}

	render() {
		if (this.state.isUserLoggedIn) return <Redirect to='/message' />

		return (
			<main className='formDashboardContainer' >
				{ this.state.isLoginForm ?
					(
						<LoginForm
							switchForm={ this.handleFormSwitch }
							handleChange={ this.handleInputChange }
							handleSubmit={ this.handleFormSubmit }
							errorMessage={ this.state.errorMessage }
						/>
					) : (
						<SignUpForm
							switchForm={ this.handleFormSwitch }
							handleChange={ this.handleInputChange }
							handleSubmit={ this.handleFormSubmit }
							errorMessage={ this.state.errorMessage }
						/>
					) }
			</main>
		);
	}

}