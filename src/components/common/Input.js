import React from 'react';
import './Input.css';
// import propType from 'prop-types';

export default function Input({ autoFocus = false, handleChange = (e) => e.preventDefault(), iconName, inputType, placeholder, name }) {

	const inputComponent = autoFocus ? (
		<input
			autoFocus
			name={ name }
			type={ inputType }
			placeholder={ placeholder }
			onChange={ handleChange }
			minLength='4'
			required
		/>
	) : (
			<input
				name={ name }
				type={ inputType }
				placeholder={ placeholder }
				onChange={ handleChange }
				minLength='4'
				required
			/>
		)
		
	return (
		<div className='formGroup' >
			<div className='leftIcon inputContainer'>
				<i className={ iconName }></i>
				{ inputComponent }
			</div>
		</div>
	);
};