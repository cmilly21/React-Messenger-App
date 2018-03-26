require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('../../models/User');
const SECRET_KEY = process.env.SECRET_KEY;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan('dev'));

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.post('/signup', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let newUser = new User({
		username: username,
		password: password,
	});

	newUser.save((err, user) => {
		if (err) {
			console.log(err);
			return res.status(409).send({ auth: false, message: 'Username is taken. Try again.' });
		};

		jwt.sign({ user: { id: user._id } }, SECRET_KEY, { expiresIn: 43200 }, (err, token) => {
			if (err) return res.send({ auth: false, message: 'Error with jwt token. ' + err });
			return res.status(200).send({ auth: true, token: token });
		});
	});
});

router.post('/login', (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;

	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ auth: false, message: 'There was a problem with the server.' });
		}
		if (!user) return res.status(404).send({ auth: false, message: 'Username not found. Try again.' });
		if (password !== user.password) return res.status(401).send({ auth: false, message: 'Incorrect password. Try Again.' });

		// 24-hours = 86400
		// 12-hours = 43200
		let token = jwt.sign({ user: { id: user._id } }, SECRET_KEY, { expiresIn: 43200 }, (err, token) => {
			if (err) return res.send({ auth: false, message: 'Error with jwt token' });
			return res.status(200).send({ auth: true, token: token });
		});
	});
});

router.get('/:tokenId', (req, res) => {
	let tokenId = req.params.tokenId;
	jwt.verify(tokenId, SECRET_KEY, (err, decoded) => {
		if (err) {
			//console.log(err);
			return res.status(500).send({ auth: false, message: 'Error with jwt token.' + err });
		}
		//console.log(decoded);
		let userId = decoded.user.id;
		User.findById(userId, (err, user) => {
			if (err) return res.status(500).send({ auth: false, message: 'There was a problem with the server.' });
			if (!user) return res.status(404).send({ auth: false, message: 'No user found. Try agin.' });

			res.status(200).send({ auth: true, username: user.username });
		});
	});
});

router.put('/:userid', (req, res) => {
	console.log(req.params.userid);
	let userId = req.params.userid;
	UserModel.findByIdAndUpdate(userId, req.body, { new: true }, (err, user) => {
		if (err) res.status(500).send('There was a problem updating the user');
		res.status(200).send(user);
	});
});

module.exports = router;