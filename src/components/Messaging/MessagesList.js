import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import '../../css/MessagesList.css';


const MessagesList = ({ user, messages }) => {

	const messagesList = messages.map(message =>
		<Message
			key={ message.id }
			user={ user }
			message={ message }
		/>
	);
	return (
		<div className='messageListContainer'>
			{ messagesList }
		</div>
	);

}

MessagesList.propTypes = {
	messages: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
};

export default MessagesList;