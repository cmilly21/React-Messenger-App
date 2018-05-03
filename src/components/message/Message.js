import React, { PureComponent } from 'react';
import './Message.css';

export default class Message extends PureComponent {
	render() {
		return (
			<div className={ this.props.user.name === this.props.messageData.sender ? 'messageContainer' : 'messageContainer messageRight' } >
				<strong className='messageSender' >
					{ this.props.messageData.sender }
				</strong>
				<div className='messageText'>
					<p>{ this.props.messageData.message }</p>
				</div>
			</div>
		);
	}
}