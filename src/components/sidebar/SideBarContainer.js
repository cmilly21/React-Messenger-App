import React, { PureComponent } from 'react';
import './SideBarContainer.css';
import Icon from '../common/Icon';
import ActiveUsersList from './ActiveUsersList';
import SettingsMenu from '../Menu/SettingsMenu';

export default class SideBarContainer extends PureComponent {

	state = {
		isMenuOpen: false
	}

	handleMenuSwitch = (e) => {
		e.preventDefault();

		this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
	}

	render() {
		return (
			<aside className='SideBarContainer' >
				<div className='SideBarHeader'>
					<Icon
						key='sidebarHeaderUsernameIcon'
						iconContainerClass='userIconContainer'
						iconClass='userIcon'
						iconName='user'
					/>
					<h2 className='username' >
						{ this.props.user ? this.props.user.name : null }
					</h2>
				</div>
				{
					this.state.isMenuOpen ?
						<SettingsMenu
							user={ this.props.user }
							handleUpdateUserProfile={ this.props.handleUpdateUserProfile }
						/>
						:
						<ActiveUsersList
							user={ this.props.user }
							connectedUsers={ this.props.connectedUsers }
						/>

				}
				<div className='logoutContainer'>
					<Icon
						key='settingsButton'
						onClickFunction={ this.handleMenuSwitch }
						iconContainerClass='settingsButtonContainer'
						iconClass='settingsButton'
						iconName='cog'
					/>
					<Icon
						key='logoutButton'
						onClickFunction={ this.props.handleLogout }
						iconContainerClass='logoutButtonContainer'
						iconClass='logoutButton'
						iconName='eject'
					/>
				</div>
			</aside>
		);
	}
}