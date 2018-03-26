import React from 'react';

const AuthInput = ({ handleChange, iconName, inputType, placeholder, name }) => {

	return (
		<div className='formGroup'>
			<div className='leftIcon inputContainer'>
				<i className={ iconName }></i>
				<input
					name={ name }
					type={ inputType }
					placeholder={ placeholder }
					onChange={ (e) => handleChange(e) }
					minLength='4'
					required
				/>
			</div>
		</div>
	);
};

export default AuthInput;