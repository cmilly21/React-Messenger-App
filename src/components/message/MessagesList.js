import React, { Component } from 'react';
import './MessagesList.css';
import Message from './Message';

export default class MessageList extends Component {

	componentDidUpdate(prevProps, prevState) {
		if (this.props.chats && prevProps.chats !== this.props.chats) {
			this.messageListRef.scrollTop = this.messageListRef.scrollHeight;
		}
	}

	render() {
		return (
			<div className='messageListContainer' ref={ (el) => this.messageListRef = el } >
				{
					this.props.chats && this.props.chats.map(chat => {
						if (chat.id === this.props.activeChat) {
							return chat.messages.map(message =>
								<Message
									key={ message.id }
									user={ this.props.user }
									messageData={ message }
								/>
							);
						}
						return chat;
					})
				}
			</div>
		);
	}
}