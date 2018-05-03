const Messages = require('../models/Messages');

module.exports = {
	sendMessage: (chatId, sender, msg, callback) => {
		const newMsg = new Messages({
			sender: sender,
			receiver: chatId,
			message: msg
		});

		newMsg.save((err, message) => {
			if (err) return console.log(err);
			callback(message);
		});
	},
	getAllMessages: (allConnectedUsers) => {
		Messages.find((err, allMessages) => {
			if (err) return console.log(err);

		});
	}
}