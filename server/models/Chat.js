module.exports = {
	creatChat: (messages = [], name = 'Community', users = []) => {
		return {
			id: name,
			name: name,
			messages: messages,
			users: users
		}
	}
}