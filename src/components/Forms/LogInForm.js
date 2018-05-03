import React from 'react';
import Input from '../common/Input';
import MainButton from '../common/MainButton';
import ErrorMessage from './ErrorMessage';

export default function LoginForm({ switchForm, handleChange, handleSubmit, errorMessage }) {

	return (
		<div className='formContainer'>
			<div className='formTitle'>
				<h2>Log in to your account</h2>
			</div>
			{ errorMessage && <ErrorMessage errorMessage={ errorMessage } /> }
			<form
				className='form'
				onSubmit={ handleSubmit }>
				<Input
					autoFocus={ true }
					handleChange={ handleChange }
					iconName='icon fas fa-user'
					inputType='text'
					placeholder='Username'
					name='username'
				/>
				<Input
					handleChange={ handleChange }
					iconName='icon fas fa-lock'
					inputType='password'
					placeholder='Password'
					name='password'
				/>
				<MainButton
					containerClass='formGroup'
					buttonClass='mainButton'
					buttonName='loginSubmit'
					buttonValue='Log In'
				/>
			</form>
			<div className='switchFormContainer'>
				<p>New? <a className='switchFormText' onClick={ switchForm }> Sign Up</a></p>
			</div>
		</div>
	);
}