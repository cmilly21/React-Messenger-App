import React, { Component } from 'react';
import MessagesList from '../Messaging/MessagesList';
import MessageInput from '../Messaging/MessageInput';
import Header from '../common/Header';
import '../../css/MessageDashboard.css';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:8080');

class MessageDashboard extends Component {

	state = {
		isUserLoggedIn: true,
		user: {
			username: '',
		},
		messages: [],
	}

	componentDidMount() {
		this.getTokenFromStorage();
		this.handleMessageReceive();
	}

	componentWillUnmount() {
		this.handleLogout();
	}

	getTokenFromStorage = () => {
		let token = localStorage.getItem('token');
		//console.log(token);
		if (!token) {
			console.log('No token in local storage!');
			this.setState({
				isUserLoggedIn: false,
			});
			return;
		}
		this.getUserProfile(token);
	}

	getUserProfile = (token) => {
		axios.get('http://localhost:8080/users/' + token)
			.then((res) => {
				this.setState({
					user: {
						username: res.data.username,
					}
				});

			})
			.catch((err) => {
				let errMsg = err.response.data;
				console.log(errMsg);
				this.setState({
					isUserLoggedIn: false,
				});
			});
	}

	handleMessageSend = (e, msg) => {
		e.preventDefault();
		if (msg === '') {
			return;
		}
		let newMessage = { id: Date.now(), message: msg };
		socket.emit('SEND_MESSAGE', newMessage);

	}

	handleMessageReceive = () => {
		socket.on('RECEIVE_MESSAGE', (msg) => {
			// console.log(msg);
			this.setState({
				messages: [ ...this.state.messages, msg ],
			});
		});
	}

	handleLogout = () => {
		delete localStorage.token;
		this.setState({
			isUserLoggedIn: false,
		});
	}

	scrollToBottom = () => {
		const element = document.getElementsByClassName('messageListContainer')[ 0 ];
		const inputElement = document.getElementsByClassName('messageInputContainer')[ 0 ];
		console.log(element.scrollHeight + inputElement.offsetHeight);
		element.scrollTo(0, element.scrollHeight + inputElement.offsetHeight);
	}

	render() {
		//console.log('render!')
		if (!this.state.isUserLoggedIn) {
			return <Redirect to='/login' />
		}
		return (
			<div className="messageDashboard">
				<Header
					handleLogout={ this.handleLogout }
				/>
				<MessagesList
					user={ this.state.user }
					messages={ this.state.messages }
				/>
				<MessageInput
					handleMessageSend={ this.handleMessageSend }
				/>
			</div>
		);

	}
}

export default MessageDashboard;