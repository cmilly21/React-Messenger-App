const { creatChat } = require('../models/Chat');

let connectedUsers = {};
let communityChat = creatChat();

module.exports = function(socket, io) {

	let sendMessageToChatFromUser;

	socket.on('USER_CONNECTED_server', (user) => {

		if (!user) return;
		if (isUserConnected(connectedUsers, user.name)) return;

		user.socketId = socket.id;
		connectedUsers = addUser(connectedUsers, user);
		socket.user = user;

		sendMessageToChatFromUser = sendMessageToChat(user.name, io);

		communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

		io.emit('USER_CONNECTED', connectedUsers); // Broadcasts 'USER_CONNECTED' to all sockets
	});

	socket.on('MESSAGE_SENT', (chatId, msgSender, msg) => {

		const newMsg = {
			id: Date.now(),
			chatId: chatId,
			sender: msgSender,
			message: msg
		}

		sendMessageToChatFromUser(chatId, newMsg);
	});

	socket.on('COMMUNITY_CHAT', (callback) => {
		callback(communityChat);
	});

	socket.on('USER_LOGOUT', (user) => {

		connectedUsers = removeUser(connectedUsers, user.name);

		communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

		io.emit('USER_CONNECTED', connectedUsers);
	});

	socket.on('disconnect', () => {
		if ('user' in socket) {

			if (!isUserConnected(connectedUsers, socket.user.name)) return console.log(`User isn't in connectUsers list`);

			connectedUsers = removeUser(connectedUsers, socket.user.name);

			communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

			io.emit('USER_CONNECTED', connectedUsers);
		}
	});
}

function sendMessageToChat(sender, io) {
	return (chatId, message) => {
		io.emit(`MESSAGE_RECEIVE-${ chatId }`, message);
	}
}

function addUser(userList, user) {

	if (!user) return;

	let newList = Object.assign({}, userList);
	newList[ user.name ] = user;

	return newList;
}

function removeUser(userList, username) {

	if (!username) return;

	let newList = Object.assign({}, userList);
	delete newList[ username ];

	return newList;
}

function isUserConnected(userList, username) {
	return username in userList;
}