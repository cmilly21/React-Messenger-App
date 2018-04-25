import React from 'react';
import '../../css/Message.css';

export default function Messages({ user, messageSender, message }) {
	return (
		<div className={ user.name ? 'messageContainer' : 'messageContainer messageRight' }>
			<strong className='messageSender' >
				{ messageSender }
			</strong>
			<div className='messageText'>
				<p>{ message }</p>
			</div>
		</div>
	);
}