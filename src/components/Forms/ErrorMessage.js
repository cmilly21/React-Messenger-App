import React from 'react';

const ErrorMessage = ({ errMsg }) => {
	return (
		<div className='errorMessage'>
			<i className='fas fa-exclamation-circle'></i>
			<p>{ errMsg }</p>
		</div>
	);
}

export default ErrorMessage