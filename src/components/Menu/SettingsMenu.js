import React, { PureComponent } from 'react';
import './SettingsMenu.css'
import SettingsTab from './SettingsTab';
import AppService from '../../AppService';

export default class SettingsMenu extends PureComponent {

	state = {
		whichTabOpen: null,
		newUsername: '',
		currentPassword: '',
		newPassword: ''
	}

	componentDidMount() {
		// this.usernameUpdateFormRef;
		// this.passwordUpdateFormRef;
	}

	handleTabClick = (e, tabName) => {
		e.preventDefault();

		if (this.state.whichTabOpen === tabName) return this.setState({ whichTabOpen: null });

		this.setState({
			whichTabOpen: tabName,
			newUsername: '',
			currentPassword: '',
			newPassword: ''
		});
	}

	handleInputChange = (e) => {
		e.preventDefault();

		this.setState({ [ e.target.name ]: e.target.value });
	}

	handleSubmitForm = (e) => {
		e.preventDefault();

		if (!this.state.whichTabOpen) return console.log('No tab open to update!');

		if (this.state.whichTabOpen === 'Username') {
			AppService.userChangeUsername(
				this.props.user._id,
				this.state.currentPassword,
				this.state.newUsername,
				this.props.handleUpdateUserProfile
			);
			return;
		}

		if (this.state.whichTabOpen === 'Password') {
			AppService.userChangePassword(
				this.props.user._id,
				this.state.currentPassword,
				this.state.newPassword,
				this.props.handleUpdateUserProfile
			);
			return;
		}
	}

	render() {
		return (
			<div className='animationContainer'>
				<div className='sidebarSubHeader'>
					<h3>Update Profile</h3>
				</div>
				<div className='Menu'>
					<SettingsTab
						whichTabOpen={ this.state.whichTabOpen }
						title='Username'
						menuTabClassName='updateUsername'
						handleTabClick={ this.handleTabClick }
						handleInputChange={ this.handleInputChange }
						handleSubmitForm={ this.handleSubmitForm }
						updateFormRef={ (el) => this.usernameUpdateFormRef = el }
					/>
					<SettingsTab
						whichTabOpen={ this.state.whichTabOpen }
						title='Password'
						menuTabClassName='updatePassword'
						handleTabClick={ this.handleTabClick }
						handleInputChange={ this.handleInputChange }
						handleSubmitForm={ this.handleSubmitForm }
						updateFormRef={ (el) => this.passwordUpdateFormRef = el }
					/>
				</div>
			</div>
		);
	}
}