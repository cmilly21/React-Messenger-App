import React from 'react';
import '../../css/MainButton.css';

export default function MainButton({ containerClass, buttonClass, buttonName, buttonValue }) {
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
