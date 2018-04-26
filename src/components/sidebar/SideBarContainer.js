import React, { PureComponent } from 'react';
import './SideBarContainer.css'
import ActiveUser from './ActiveUser';
import Icon from '../common/Icon';

export default class SideBarContainer extends PureComponent {

	render() {
		const { user, activeChat, chats, isMenuOpen, toggleMenu, handleActiveChatChange, handleLogout } = this.props;

		let sidebarBarContainerClass = isMenuOpen ? 'SideBarContainer closeSideBar' : 'SideBarContainer';

		return (
			<aside className={ sidebarBarContainerClass } >
				<div className='SideBarHeader'>
					<Icon
						onClickFunction={ toggleMenu }
						iconContainerClass='userIconContainer'
						iconClass='userIcon'
						iconName='user'
					/>
					<h2 className='username' onClick={ toggleMenu }>
						{ user ? user.name : null }
					</h2>
				</div>
				<div className='sidebarSubHeader'>
					<h3>User's Online</h3>
				</div>
				<div className='activeUsers'>
					<div className='activeUsersList'>
						{
							chats.map(chat => {

								const communityChatUser = {
									_id: 'CommunityChat',
									name: 'Community Chat',
									socketId: 'CommunityChat'
								};

								let newActiveUsers = [ communityChatUser, ...chat.users ]
								return newActiveUsers.map(activerUser => {
									if (activerUser.name !== user.name)
										return <ActiveUser
											key={ activerUser._id }
											user={ activerUser }
											setActiveChat={ (e) => e.preventDefault() /* handleActiveChatChange */ }
										/>
								});
							})
						}
					</div>
				</div>
			</aside>
		);
	}
}