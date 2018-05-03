import React from 'react';
import './SettingsTab.css';
import Icon from '../common/Icon';
import UpdateForm from './UpdateForm';

export default function SettingsTab({
	whichTabOpen,
	title,
	menuTabClassName,
	handleTabClick,
	handleInputChange,
	handleSubmitForm,
	updateFormRef
}) {

	return (
		<div className='SettingsTab'>
			<div className={ title === whichTabOpen ? 'SettingsTabButton SettingsTabButtonActive' : 'SettingsTabButton' }
				onClick={ (e) => handleTabClick(e, title) }>
				{ title }
				<Icon
					key='MenuTabArrowIcon'
					iconContainerClass={ title === whichTabOpen ? 'MenuTabArrowIconContainer MenuTabArrowIconActive' : 'MenuTabArrowIconContainer' }
					iconClass='MenuTabArrowIcon '
					iconName='angle-down'
				/>
			</div>
			{
				title === 'Username' ? (
					<UpdateForm
						whichTabOpen={ whichTabOpen }
						title={ title }
						placeholderOne='New Username'
						inputNameOne='newUsername'
						placeholderTwo='Current Password'
						inputNameTwo='currentPassword'
						handleInputChange={ handleInputChange }
						handleSubmitForm={ handleSubmitForm }
						updateFormRef={ updateFormRef }
					/>
				) : (
						<UpdateForm
							whichTabOpen={ whichTabOpen }
							title={ title }
							placeholderOne='New Password'
							inputNameOne='newPassword'
							placeholderTwo='Current Password'
							inputNameTwo='currentPassword'
							handleInputChange={ handleInputChange }
							handleSubmitForm={ handleSubmitForm }
							updateFormRef={ updateFormRef }
						/>
					)
			}
		</div>
	);
}