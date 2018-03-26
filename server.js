// server
require('dotenv').config();
const app = require('./server/app');
const PORT = process.env.PORT;

const server = app.listen(PORT, (req, res) => {
	console.log(`Server listening on port ${ PORT }`);
});

const io = require('socket.io')(server);

io.on('connection', (client) => {
	console.log('User connected!');

	client.on('SEND_MESSAGE', (msg) => {
		console.log(msg);
		io.emit('RECEIVE_MESSAGE', msg);
	});

	client.on('disconnect', () => {
		console.log('User disconnected!');
	});
});