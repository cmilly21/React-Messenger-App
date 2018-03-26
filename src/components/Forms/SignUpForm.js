import React, { Component } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';

class SignUpForm extends Component {

	state = {
		username: '',
		password: '',
		confirmPassword: '',
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
		let confirmPassword = this.state.confirmPassword;

		if (username.length < 4 && password.length < 4 && password !== confirmPassword) {
			console.log('Too short')
			return;
		}
		console.log(username, password);
		axios.post('http://localhost:8080/users/signup', { username: username, password: password })
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
					<h2>Create An Account</h2>
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
						inputType='text'
						placeholder='Password'
						name='password'
					/>
					<AuthInput
						handleChange={ this.handleInputChange }
						iconName='icon fas fa-lock'
						inputType='text'
						placeholder='Confirm Password'
						name='confirmPassword'
					/>
					<AuthButton
						buttonType='submit'
						buttonName='signUp'
						buttonValue='Create Account'
					/>
				</form>

				<div className='createAccount'>
					<p>Already have an account? <a onClick={ this.props.switchForm }> Log In</a></p>
				</div>
			</div>
		);
	}
}

export default SignUpForm;