const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true,
		trim: true
	},
	receiver: {
		type: String,
		required: true,
		trim: true
	},
	message: {
		type: String,
		required: true
	}
}, { collection: 'Messages' });

module.exports = mongoose.model('MessagesModel', MessagesSchema);