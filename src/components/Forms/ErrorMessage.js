import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({ errorMessage }) {
	return (
		<div className='errorMessage'>
			<p className='errorText'>
				<i className='errorIcon fas fa-exclamation-circle'></i>
				{ errorMessage }
			</p>
		</div>
	);
}