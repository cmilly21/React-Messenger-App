import React from 'react';
import '../../css/Header.css';

const Header = ({ handleLogout }) => {
	return (
		<div className="Header">
			<div>
				<input
					className='logoutButton'
					type='button'
					value='Logout'
					onClick={ (e) => handleLogout(e) }
				/>
			</div>
			<h1>Quick Messaging App</h1>
		</div>
	);
}

export default Header