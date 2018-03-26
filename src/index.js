import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/containers/App';
require('dotenv').config();

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
