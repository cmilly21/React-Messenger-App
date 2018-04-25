import React from 'react';
// import PropTypes from 'prop-types';
import '../../css/Message.css';

export default function Messages({ user, messageSender, message }) {
	const messageClass = messageSender === user.name ? 'messageContainer' : 'messageContainer messageRight'

	return (
		<div className={ messageClass }>
			<strong className='messageSender' >
				{ messageSender }
			</strong>
			<div className='messageText'>
				<p>{ message }</p>
			</div>
		</div>
	);
}