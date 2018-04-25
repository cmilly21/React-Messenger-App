const { creatChat } = require('../models/Chat');
const { createMessage } = require('../models/Message');

let connectedUsers = {};
let communityChat = creatChat();

module.exports = function(socket, io) {

	let sendMessageToChatFromUser;

	socket.on('USER_CONNECTED', (user) => {

		if (!user) return console.log('No user to connect!');
		console.log('User to connect =>', user);

		if (isUserConnected(connectedUsers, user.name)) return console.log('User already connected');

		user.socketId = socket.id;
		connectedUsers = addUser(connectedUsers, user);
		socket.user = user;

		sendMessageToChatFromUser = sendMessageToChat(user.name, io);

		communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

		io.emit('NEW_CONNECTED_USERS', communityChat); // Broadcasts 'USER_CONNECTED' to all sockets
		console.log('On Connect - Connected Users =>', connectedUsers);
	});

	socket.on('MESSAGE_SENT', (chatId, msgSender, msg) => {
		const newMsg = createMessage(chatId, msgSender, msg);
		console.log(newMsg);
		sendMessageToChatFromUser(chatId, newMsg);
	});

	socket.on('COMMUNITY_CHAT', (callback) => {
		callback(communityChat);
	});

	socket.on('USER_LOGOUT', (user) => {

		connectedUsers = removeUser(connectedUsers, user.name);

		communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

		io.emit('NEW_CONNECTED_USERS', communityChat);
		console.log('Logout', connectedUsers);
	});

	socket.on('disconnect', () => {
		if ('user' in socket) {

			if (!isUserConnected(connectedUsers, socket.user.name)) return console.log(`User isn't in connectUsers list`);

			connectedUsers = removeUser(connectedUsers, socket.user.name);

			communityChat.users = Object.keys(connectedUsers).map(key => connectedUsers[ key ]);

			io.emit('NEW_CONNECTED_USERS', communityChat);
			console.log('Disconnect - New connectedUsers =>', connectedUsers);
		}
	});
}

function sendMessageToChat(sender, io) {
	return (chatId, message) => {
		console.log('Send Message To Chat =>', sender, chatId, message);
		io.emit(`MESSAGE_RECEIVE-${ chatId }`, message);
	}
}

function addUser(userList, user) {

	if (!user) return console.log('No user to add to connectUsers!');

	let newList = Object.assign({}, userList);
	newList[ user.name ] = user;

	return newList;
}

function removeUser(userList, username) {

	if (!username) return console.log('No User to removeUser');

	let newList = Object.assign({}, userList);
	delete newList[ username ];

	return newList;
}

function isUserConnected(userList, username) {
	console.log('isUserConnected?', username in userList);
	return username in userList;
}