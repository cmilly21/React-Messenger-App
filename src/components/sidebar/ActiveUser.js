import React from 'react';
// import PropTypes from 'prop-types';
import '../../css/ActiveUser.css';
import Icon from '../common/Icon';

export default function ActiveUser({ user, setActiveChat }) {

	return (
		<div className='activeUser' onClick={ (e) => setActiveChat(e, user.socketId) }>
			<Icon
				onClickFunction={ (e) => e.preventDefault() }
				iconContainerClass='chatsIconContainer'
				iconClass='fas fa-comments chatsIcon'
				iconName='COMMUNITY_CHAT'
			/>
			<p>{ user.name }</p>
		</div>
	)
}