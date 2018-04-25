import React from 'react';
import ReactDOM from 'react-dom';
import FormsPage from '../forms/FormsPage';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<FormsPage />, div);
});

describe()