import React from 'react';
import './UpdateForm.css';

export default function UpdateForm({
	whichTabOpen,
	title,
	placeholderOne,
	inputNameOne,
	placeholderTwo,
	inputNameTwo,
	handleInputChange,
	handleSubmitForm,
	updateFormRef }) {

	return (
		<form
			className={ title === whichTabOpen ? 'UpdateForm UpdateFormOpen' : 'UpdateForm' }
			ref={ updateFormRef }
			onSubmit={ handleSubmitForm }>
			<input
				autoFocus
				name={ inputNameOne }
				type='text'
				placeholder={ placeholderOne }
				onChange={ handleInputChange }
				minLength='4'
				required
			/>
			<input
				name={ inputNameTwo }
				type='text'
				placeholder={ placeholderTwo }
				onChange={ handleInputChange }
				minLength='4'
				required
			/>
			<input
				className='UpdateFormSubmitButton'
				type='submit'
				value='Submit'
			/>
		</form>
	);
}