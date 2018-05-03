const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		unique: false,
		required: true,
		trim: true
	}
}, { collection: 'Users' });

module.exports = mongoose.model('UserModel', UserSchema);