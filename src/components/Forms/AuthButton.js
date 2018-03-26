import React from 'react';

const AuthButton = ({ buttonType, buttonName, buttonValue }) => {
	return (
		<div className='formGroup'>
			<input
				className='mainButton'
				type={ buttonType }
				name={ buttonName }
				value={ buttonValue }
			/>
		</div>
	);
};

export default AuthButton;