module.exports = {
	createMessage: (receiver, sender, message) => {
		return {
			id: Date.now(),
			sender: sender,
			receiver: receiver,
			message: message
		}
	}
}