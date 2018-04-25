import React, { PureComponent } from 'react';
import '../../css/MessageDashboard.css';
import Header from '../common/Header';
import SideBarContainer from '../sidebar/SideBarContainer';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import { Redirect } from 'react-router-dom';

import AuthService from '../../AuthService';
import io from 'socket.io-client';
const socketURL = '/';

export default class MessagePage extends PureComponent {


	state = {
		isUserLoggedIn: true,
		socket: null,
		user: null,
		activeChat: 'Community',
		chats: []
	}

	componentDidMount() {
		this.authUser();
		this.messageList;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state && this.state.isUserLoggedIn) {
			this.messageList.scrollTop = this.messageList.scrollHeight;
			return;
		}
		return;
	}

	componentWillUnmount() {
		const { socket, user } = this.state;
		console.log(socket, user);
		if (socket && user) {
			socket.emit('USER_LOGOUT', user);
			console.log('Disconnecting!');
		}
	}

	async authUser() {
		try {
			const data = await AuthService.authUser();
			console.log(data)
			if (!data.auth || !data.user) return this.setState({ isUserLoggedIn: false });
			this.initSocket(data.user);
		} catch (err) {
			console.log(err);
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

		this.setState({
			socket: socket,
			user: user,
		});

		socket.on('connect', () => {
			console.log('Socket.io connected!');
			socket.emit('USER_CONNECTED', user);
			socket.emit('COMMUNITY_CHAT', this.resetChat);
		});

		socket.on('reconnect', (attemptNum) => {
			console.log('Socket reconnected!');
			socket.emit('USER_CONNECTED', user);
			this.setState({
				socket: socket,
				user: user,
			});
		});

		socket.on('NEW_CONNECTED_USERS', (communityChat) => {
			const { chats } = this.state;

			console.log('oldCommunityChat =>', chats);

			const newChats = chats.map(chat => {
				if (chat.id === 'Community') {
					return chat = communityChat;
				}
				return chat;
			});

			console.log('newChats =>', communityChat);

			this.setState({ chats: newChats });
		});

	}

	handleActiveChatChange = (e, chatId) => {
		e.preventDefault();

		console.log(chatId);

		this.setState({ activeChat: chatId });
	}

	resetChat = (chat) => {
		return this.addChat(chat, true);
	}

	addChat = (chat, reset = false) => {
		const { socket, chats } = this.state;
		console.log('addChat', chat);
		const newChats = reset ? [ chat ] : [ ...chats, chat ];
		this.setState({ chats: newChats });

		socket.on(`MESSAGE_RECEIVE-${ chat.id }`, this.addMessageToChat(chat.id));
	}

	handleLogout = (e) => {
		e.preventDefault();

		AuthService.userLogout();
		this.setState({ isUserLoggedIn: false });
	}

	// This function is sent to the server 
	addMessageToChat = (chatId) => {
		return message => {
			const { chats } = this.state;

			console.log(chatId);
			console.log(message);

			let newChats = chats.map(chat => {
				if (chat.id === chatId) {
					chat.messages.push(message);
					return chat;
				}
			});

			console.log('addMessageToChat =>', newChats);
			this.setState({ chats: newChats })
		}
	}

	render() {
		const { user, socket, activeChat, chats } = this.state;
		if (!this.state.isUserLoggedIn) return <Redirect to='/' />;

		return (
			<div className='page' >
				<SideBarContainer
					user={ user }
					activeChat={ activeChat }
					chats={ chats }
					handleActiveChatChange={ this.handleActiveChatChange }
					handleLogout={ this.handleLogout }
				/>
				<main className='messageDashboard' >
					<Header />
					<MessagesList
						user={ user }
						chats={ chats }
						activeChat={ activeChat }
						messageListRef={ (el) => this.messageList = el }
					/>
					<MessageInput
						activeChat={ activeChat }
						socket={ socket }
						user={ user }
					/>
				</main>
			</div>
		);
	}
}