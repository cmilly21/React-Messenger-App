require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

// const connectionString = process.env.NODE_ENV === 'production' ? process.env.DB_CONNECTION : 'mongodb://localhost:27017/messageapp';
const connectionString = process.env.DB_CONNECTION;

mongoose.connect(connectionString, (err) => {
	if (err) throw err;
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