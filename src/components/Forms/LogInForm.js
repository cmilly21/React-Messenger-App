import React, { Component } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

class LogInForm extends Component {

	state = {
		username: '',
		password: '',
	}

	handleInputChange = (e) => {
		e.preventDefault();

		this.setState({
			[ e.target.name ]: e.target.value,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let username = this.state.username;
		let password = this.state.password;

		axios.post('http://localhost:8080/users/login', { username: username, password: password })
			.then((res) => {
				this.props.handleSuccess(res.data.token);
			})
			.catch((err) => {
				this.props.handleFailure(err);
			});
	}

	render() {

		const errorComponent = this.props.errMsg ? <ErrorMessage errMsg={ this.props.errMsg } /> : null;

		return (
			<div className='formContainer'>
				<div className='formTitle'>
					<h2>Log in to your account</h2>
				</div>
				{ errorComponent }
				<form
					className='form'
					onSubmit={ (e) => this.handleSubmit(e) }>
					<AuthInput
						handleChange={ this.handleInputChange }
						iconName='icon fas fa-user'
						inputType='text'
						placeholder='Username'
						name='username'
					/>
					<AuthInput
						handleChange={ this.handleInputChange }
						iconName='icon fas fa-lock'
						inputType='password'
						placeholder='Password'
						name='password'
					/>
					<AuthButton
						buttonType='submit'
						buttonName='loginSubmit'
						buttonValue='Log In'
					/>
				</form>
				<div className='createAccount'>
					<p>New? <a onClick={ this.props.switchForm }> Sign Up</a></p>
				</div>
			</div>
		);
	}
}

export default LogInForm;