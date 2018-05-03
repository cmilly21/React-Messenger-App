import React, { PureComponent } from 'react';
import './ActiveUser.css';
import Icon from '../common/Icon';

export default class ActiveUser extends PureComponent {
	render() {
		return (
			<div className='activeUserContainer' onClick={ (e) => this.props.setActiveChat(e, this.props.user.socketId) }>
				<Icon
					key={ this.props.user._id }
					onClickFunction={ (e) => e.preventDefault() }
					iconContainerClass='chatsIconContainer'
					iconClass='fas fa-comments chatsIcon'
					iconName='COMMUNITY_CHAT'
				/>
				<p className='activeUser'>{ this.props.user.name }</p>
			</div>
		);
	}
}