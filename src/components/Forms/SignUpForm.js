import React from 'react';
import Input from '../common/Input';
import MainButton from '../common/MainButton';
import ErrorMessage from './ErrorMessage';

export default function SignUpForm({ switchForm, handleChange, handleSubmit, errorMessage }) {

	return (
		<div className='formContainer'>
			<div className='formTitle'>
				<h2>Create An Account</h2>
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
					inputType='text'
					placeholder='Password'
					name='password'
				/>
				<Input
					handleChange={ handleChange }
					iconName='icon fas fa-lock'
					inputType='text'
					placeholder='Confirm Password'
					name='confirmPassword'
				/>
				<MainButton
					containerClass='formGroup'
					buttonClass='mainButton'
					buttonName='signUp'
					buttonValue='Create Account'
				/>
			</form>

			<div className='switchFormContainer'>
				<p>Already have an account? <a className='switchFormText' onClick={ switchForm }> Log In</a></p>
			</div>
		</div>
	);
}