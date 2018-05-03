import React, { Component } from 'react';
import './MessagePage.css';
import Header from '../common/Header';
import SideBarContainer from '../sidebar/SideBarContainer';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import { Redirect } from 'react-router-dom';

import AuthService from '../../AuthService';
import io from 'socket.io-client';
const socketURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080';

// if (process.env.NODE_ENV !== 'production') {
// 	const { whyDidYouUpdate } = require('why-did-you-update')
// 	whyDidYouUpdate(React)
// }

export default class MessagePage extends Component {

	state = {
		isUserLoggedIn: true,
		socket: null,
		user: null,
		activeChat: 'Community',
		chats: [],
		connectedUsers: [],
	}

	componentDidMount() {
		this.authUser();
	}

	componentWillUnmount() {
		const { socket, user } = this.state;
		if (socket && user) {
			socket.emit('USER_LOGOUT', user);
		}
	}

	async authUser() {
		try {
			const data = await AuthService.authUser();
			if (!data.auth || !data.user) return this.setState({ isUserLoggedIn: false });
			this.initSocket(data.user);
		} catch (err) {
			this.setState({ isUserLoggedIn: false });
		}
	}

	initSocket = (user) => {
		const socket = io(socketURL, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: Infinity,
			forceNew: true
		});

		socket.on('connect', () => {
			socket.emit('USER_CONNECTED_server', user);
			socket.emit('COMMUNITY_CHAT', this.resetChat);

			this.setState({
				user: user,
				socket: socket
			});
		});

		socket.on('reconnect', (attemptNum) => {
			console.log('Reconnected')
			socket.emit('USER_CONNECTED_server', user);
			socket.emit('COMMUNITY_CHAT', this.resetChat);
			this.setState({
				socket: socket,
				user: user,
			});
		});

		socket.on('USER_CONNECTED', (connectedUsers) => {

			let newConnectedUsers = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

			this.setState({ connectedUsers: newConnectedUsers });
		});
	}

	handleActiveChatChange = (e, chatId) => {
		e.preventDefault();

		this.setState({ activeChat: chatId });
	}

	resetChat = (chat) => {
		return this.addChat(chat, true);
	}

	addChat = (chat, reset = false) => {
		const { socket, chats } = this.state;

		const newChats = reset ? [ chat ] : [ ...chats, chat ];
		this.setState({ chats: newChats });

		socket.on(`MESSAGE_RECEIVE-${ chat.id }`, this.addMessageToChat(chat.id));
	}

	// This function is sent to the server 
	addMessageToChat = (chatId) => {
		return message => {
			const { chats } = this.state;

			let newChats = chats.map(chat => {
				if (chat.id === chatId) {
					console.log('is message already in list?', chat.messages.includes(message));
					if (chat.messages.includes(message)) return chat;
					chat.messages.push(message);
					return chat;
				}
				return chat;
			});
			this.setState({ chats: newChats })
		}
	}

	handleLogout = (e) => {
		e.preventDefault();

		this.state.socket.emit('USER_LOGOUT', this.state.user);
		AuthService.userLogout();
		this.setState({ isUserLoggedIn: false });
	}

	handleUpdateUserProfile = (updatedUser) => {
		this.state.socket.emit('USER_LOGOUT', this.state.user);

		this.setState({ user: updatedUser });

		this.state.socket.emit('USER_CONNECTED_server', updatedUser);
	}

	render() {

		if (!this.state.isUserLoggedIn) return <Redirect to='/' />;

		return (
			<div className='page' >
				<SideBarContainer
					user={ this.state.user }
					activeChat={ this.state.activeChat }
					connectedUsers={ this.state.connectedUsers }
					handleActiveChatChange={ this.handleActiveChatChange }
					handleLogout={ this.handleLogout }
					handleUpdateUserProfile={ this.handleUpdateUserProfile }
				/>
				<main className='messageDashboard' >
					<Header />
					<MessagesList
						user={ this.state.user }
						activeChat={ this.state.activeChat }
						chats={ this.state.chats }
					/>
					<MessageInput
						activeChat={ this.state.activeChat }
						socket={ this.state.socket }
						user={ this.state.user }
					/>
				</main>
			</div>
		);
	}
}