require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DB_CONNECTION)
	// mongoose.connect(process.env.LOCAL_DB_CONNECTION)
	.catch((err) => {
		console.error(err);
		mongoose.disconnect();
	});

db.once('open', () => {
	console.log(`MongoDB connection opened!`);
});

db.on('disconnect', () => {
	console.log('MongoDB connection is disconnected.');
});

process.on('SIGINT', () => {
	db.close(() => {
		console.warn('MongoDB connection terminated.');
		process.exit(1);
	});
});