import React from 'react';
import './ActiveUser.css';
import Icon from '../common/Icon';

export default function ActiveUser({ user, setActiveChat }) {
	return (
		<div className='activeUserContainer' onClick={ (e) => setActiveChat(e, user.socketId) }>
			<Icon
				onClickFunction={ (e) => e.preventDefault() }
				iconContainerClass='chatsIconContainer'
				iconClass='fas fa-comments chatsIcon'
				iconName='COMMUNITY_CHAT'
			/>
			<p className='activeUser'>{ user.name }</p>
		</div>
	)
}