import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/MessageInput.css';

class MessageInput extends Component {

	state = {
		message: ''
	}

	handleChange = (e) => {
		this.setState({
			message: e.target.value,
		});
	}

	handleSubmit = (e, msg) => {
		this.props.handleMessageSend(e, msg);
		this.setState({
			message: '',
		});
	}

	render() {
		return (
			<form
				className='messageInputContainer'
				onSubmit={ (evt) => this.handleSubmit(evt, this.state.message) }>
				<input
					autoFocus
					className='messageInput'
					type='text'
					placeholder='Message...'
					value={ this.state.message }
					onChange={ this.handleChange }
				/>
				<input
					className='submitInput'
					type='submit'
					value='Send'
				/>
			</form>
		);
	}
}

MessageInput.propTypes = {
	handleMessageSend: PropTypes.func.isRequired,
}

export default MessageInput;