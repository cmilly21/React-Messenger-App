import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import '../../css/SideBarContainer.css'
import ActiveUser from './ActiveUser';
import Icon from '../common/Icon';

export default class SideBarContainer extends PureComponent {

	state = {
		whichTab: 'SETTINGS',
	}

	// setActiveChat = (e, activeChat) => {
	// 	console.log(activeChat)
	// 	// this.setState({ activeChat });
	// }

	handleTabChange = (e, tabName) => {
		e.preventDefault();

		this.setState({ whichTab: tabName });
	}

	render() {
		const { user, activeChat, chats, handleActiveChatChange, handleLogout } = this.props;

		let activeUserComponents;

		chats.forEach(chat => {

			activeUserComponents = chat.users.map(chatUser => {
				if (chatUser.name === user.name) return;
				return <ActiveUser
					key={ chatUser._id }
					user={ chatUser }
					setActiveChat={ handleActiveChatChange }
				/>
			});
		});

		return (
			<aside className='sideBarContainer' >
				<div className='sideBarHeader'>
					<h3 className='username'>{ user ? user.name : null }</h3>
					<Icon
						onClickFunction={ handleLogout }
						iconContainerClass='logoutIconContainer'
						iconClass='logoutIcon'
						iconName='eject'
					/>
				</div>
				<div className='activeUserTitle'>
					<h3>User's Online</h3>
				</div>
				<div className='activeUsers'>
					<div className='activeUsersList'>
						{ activeUserComponents }
					</div>
				</div>
			</aside>
		);
	}
}