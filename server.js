require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const db = require('./server/db/db');
const users = require('./server/routes/users');
const auth = require('./server/routes/auth');
// const messages = require('./server/routes/messages');
const SocketManager = require('./server/controllers/SocketManager');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'https://schoolmessageapp.herokuapp.com/' : '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/users', users);
app.use('/jwt', auth);
// app.use('/messages', messages);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// }

io.on('connection', (socket) => {
	SocketManager(socket, io);
});

server.listen(PORT, (req, res) => {
	console.log(`Server listening on port ${ PORT }`);
});