import React from 'react';
import '../../css/Message.css';

const name = ({ user, message }) => {

	return (
		<div className="message">
			<p>{ user.username }</p>
			<p>{ message.message }</p>
		</div>
	);
}

export default name