// This file configures only the app
const express = require('express');
const app = express();
const db = require('./db/db');
const UserController = require('./controllers/user/UserController');

app.use('/users', UserController);

module.exports = app;