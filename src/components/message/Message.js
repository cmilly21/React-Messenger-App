import React from 'react';
import './Message.css';

export default function Message({ user, messageData }) {
	return (
		<div className={ user.name === messageData.sender ? 'messageContainer' : 'messageContainer messageRight' }>
			<strong className='messageSender' >
				{ messageData.sender }
			</strong>
			<div className='messageText'>
				<p>{ messageData.message }</p>
			</div>
		</div>
	);
}