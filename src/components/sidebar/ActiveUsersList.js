import React from 'react';
import './ActiveUsersList.css';
import ActiveUser from './ActiveUser';

export default function ActiveUsersList({ ...props }) {

	// if (!props.user) return null;

	const communityChat = {
		_id: 'CommunityChat',
		name: 'Community Chat',
		socketId: 'CommunityChat'
	};

	let newActiveUsers = [ communityChat, ...props.connectedUsers ];

	return (
		<div className='animationContainer'>
			<div className='sidebarSubHeader'>
				<h3>User's Online</h3>
			</div>
			<div className='activeUsersList'>
				{
					props.user && newActiveUsers.map(activerUser => {
						if (activerUser.name !== props.user.name) {
							return (
								<ActiveUser
									key={ activerUser._id }
									user={ activerUser }
									setActiveChat={ (e) => e.preventDefault() /* handleActiveChatChange */ }
								/>
							);
						}
						return;
					})
				}
			</div>
		</div>
	);
}