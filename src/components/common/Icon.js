import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../../css/Icon.css';

export default function Icon({ onClickFunction, iconContainerClass, iconClass, iconName }) {
	return (
		<div
			onClick={ (e) => onClickFunction(e, iconName) }
			className={ `iconContainer ${ iconContainerClass }` }
			name={ iconName }
		>
			<FontAwesome
				className={ iconClass }
				name={ iconName }
			/>
		</div>
	);
}