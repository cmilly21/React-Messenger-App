import React, { PureComponent } from 'react';
import './MessagePage.css';
import Header from '../common/Header';
import SideBarContainer from '../sidebar/SideBarContainer';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import Menu from '../Menu/Menu';
import { Redirect } from 'react-router-dom';

import AuthService from '../../AuthService';
import io from 'socket.io-client';
const socketURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080'

export default class MessagePage extends PureComponent {

	state = {
		isUserLoggedIn: true,
		socket: null,
		user: null,
		activeChat: 'Community',
		chats: [],
		isMenuOpen: false
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

		this.setState({
			socket: socket,
			user: user,
		});

		socket.on('connect', () => {
			socket.emit('USER_CONNECTED', user);
			socket.emit('COMMUNITY_CHAT', this.resetChat);
		});

		socket.on('reconnect', (attemptNum) => {
			socket.emit('USER_CONNECTED', user);
			this.setState({
				socket: socket,
				user: user,
			});
		});

		socket.on('NEW_CONNECTED_USERS', (communityChat) => {
			const { chats } = this.state;

			const newChats = chats.map(chat => {
				if (chat.id === 'Community') {
					return chat = communityChat;
				}
				return chat;
			});


			this.setState({ chats: newChats });
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

	handleLogout = (e) => {
		e.preventDefault();

		AuthService.userLogout();
		this.setState({ isUserLoggedIn: false });
	}

	// This function is sent to the server 
	addMessageToChat = (chatId) => {
		return message => {
			const { chats } = this.state;

			let newChats = chats.map(chat => {
				if (chat.id === chatId) {
					chat.messages.push(message);
					return chat;
				}
			});
			this.setState({ chats: newChats })
		}
	}

	toggleMenu = (e) => {
		e.preventDefault();
		this.setState({ isMenuOpen: !this.state.isMenuOpen })
	}

	render() {
		const { user, socket, activeChat, chats, isMenuOpen } = this.state;
		if (!this.state.isUserLoggedIn) return <Redirect to='/' />;

		return (
			<div className='page' >
				<Menu
					isMenuOpen={ isMenuOpen }
					toggleMenu={ this.toggleMenu }
				/>
				<SideBarContainer
					user={ user }
					activeChat={ activeChat }
					chats={ chats }
					isMenuOpen={ isMenuOpen }
					toggleMenu={ this.toggleMenu }
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