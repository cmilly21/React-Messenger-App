import React, { Component } from 'react';
import './MessageInput.css';

// const MessageInput = ({ inputValue, handleChange, handleSubmit }) => {
export default class MessageInput extends Component {

	state = {
		message: '',
	}

	shouldComponentUpdate(prevProps, prevState) {
		if (prevState.message !== this.state.message) return true;

		return false;
	}

	handleMessageChange = (e) => {
		e.preventDefault()

		// console.log('onChange: Message Input');

		this.setState({ message: e.target.value });
	}

	sendMessage = (e) => {
		e.preventDefault();

		const { message } = this.state;
		const { activeChat, socket, user } = this.props;

		socket.emit('MESSAGE_SENT', activeChat, user.name, message);
		this.setState({ message: '' });
	}

	render() {
		// console.log('Render: Message Input');
		return (
			<form
				className='messageInputContainer'
				onSubmit={ this.sendMessage }>
				<input
					autoFocus
					className='messageInput'
					type='text'
					placeholder='Message...'
					value={ this.state.message }
					onChange={ this.handleMessageChange }
				/>
				<input
					disabled={ this.state.message < 1 }
					className='submitInput'
					type='submit'
					value='Send'
				/>
			</form>
		);
	}
}