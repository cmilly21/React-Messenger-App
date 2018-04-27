import React from 'react';
import './MessagesList.css';
import Message from './Message';

export default function MessagesList({ user, chats, activeChat, messageListRef }) {
	return (
		<div className='messageListContainer' ref={ messageListRef }>
			{
				chats.map(chat => {
					if (chat.id === activeChat)
						return chat.messages.map(message =>
							<Message
								key={ message.id }
								user={ user }
								messageData={ message }
							/>
						);
				})
			}
		</div>
	);
}