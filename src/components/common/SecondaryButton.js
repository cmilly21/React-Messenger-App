import React from 'react';
import '../../css/SecondaryButton.css';

export default function SecondaryButton({ containerClass = '', buttonClass, buttonName, buttonValue }) {
	return (
		<div className={ containerClass }>
			<input
				className={ buttonClass }
				type='submit'
				name={ buttonName }
				value={ buttonValue }
			/>
		</div>
	);
};