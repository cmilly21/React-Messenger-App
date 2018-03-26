// connection to the db
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(`mongodb://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }${ process.env.DB_HOST }/${ process.env.DB_NAME }`);
mongoose.Promise = global.Promise;

db.on('error', (err) => {
	console.error(`Mongoose connection error: ${ err }`);
	process.exit(1);
});

db.once('open', () => {
	console.log(`Connected to MongoDB : ${ process.env.DB_NAME }`);
});