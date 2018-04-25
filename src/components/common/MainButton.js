import React from 'react';
// import PropTypes from 'prop-types';
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

// MainButton.propTypes = {
// 	containerClass: PropTypes.string.isRequired,
// 	buttonClass: PropTypes.string.isRequired,
// 	buttonName: PropTypes.string.isRequired,
// 	buttonValue: PropTypes.string.isRequired,
// }