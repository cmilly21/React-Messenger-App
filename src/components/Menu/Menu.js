import React, { Component } from 'react';
import './Menu.css'
import Icon from '../common/Icon';

// export default function Menu({ isMenuOpen, toggleMenu }) {
export default class Menu extends Component {

	state = {

	}

	render() {

		const { isMenuOpen, toggleMenu } = this.props;

		return (
			<aside className={ isMenuOpen ? 'Menu openMenu' : 'Menu' }>
				<div className='MenuHeader'>
					<Icon
						onClickFunction={ toggleMenu }
						iconContainerClass='closeMenuIconContainer'
						iconClass='closeMenuIcon'
						iconName='window-close'
					/>
				</div>
				<div className='MenuTabList'>
				</div>
			</aside>
		);
	}
}