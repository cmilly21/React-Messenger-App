import React from 'react';
import Messages from './Messages';

export default function MessagesList({ user, chats, activeChat, messageListRef }) {

	let messageComponents;

	chats.forEach(chat => {
		if (chat.id === activeChat) {
			{
				messageComponents = chat.messages.map(message =>
					<Messages
						key={ message.id }
						user={ user }
						messageSender={ message.sender }
						message={ message.message }
					/>
				);
			}
		}
	});

	return (
		<div className='messageListContainer' ref={ messageListRef }>
			{ messageComponents }
		</div>
	);
}