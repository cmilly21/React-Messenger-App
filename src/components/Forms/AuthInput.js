import React from 'react';
// import propType from 'prop-types';

export default function AuthInput({ autoFocus, handleChange, iconName, inputType, placeholder, name }) {

	const inputComponent = autoFocus ? (
		<input
			autoFocus
			name={ name }
			type={ inputType }
			placeholder={ placeholder }
			onChange={ (e) => handleChange(e) }
			minLength='4'
			required
		/>
	) : (
			<input
				name={ name }
				type={ inputType }
				placeholder={ placeholder }
				onChange={ (e) => handleChange(e) }
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