require('dotenv').config();
const User = require('../models/Users');
const JWT_SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
	userLogin: (req, res, next) => {
		let name = req.body.name;
		let password = req.body.password;

		name.toLowerCase();

		User.findOne({ name: name }, (err, user) => {
			if (err) return res.status(500).json({ auth: false, message: 'There was a problem with the server.', errMsg: err });
			if (!user) return res.status(404).json({ auth: false, message: 'User doesn\'t exist.', errMsg: err });
			if (password !== user.password) return res.status(401).json({ auth: false, message: 'Incorrect password.', errMsg: err });

			req.body.user = user;
			next();
		});
	},
	userCreate: (req, res, next) => {
		console.log(req.body);
		let newUser = new User({
			name: req.body.name,
			password: req.body.password,
		});

		newUser.save((err, user) => {
			if (err) return res.status(409).json({ auth: false, message: 'Username already in use.', errMsg: err });
			if (!user) return res.status(409).json({ auth: false, message: 'No user to save.' });

			req.body.user = user;
			next();
		});
	},
	getUserProfile: (req, res, next) => {
		const userId = req.body.user._id;

		User.findById(userId, (err, user) => {
			if (err) return res.status(500).json({ auth: false, message: 'There was a problem with the server.' });
			if (!user) return res.status(404).json({ auth: false, message: 'No user found.' });

			res.status(200).json({
				auth: true,
				user: {
					_id: user._id,
					name: user.name
				}
			});
		});
	},
	updateUsername: (req, res) => {
		let userId = req.params.userId;
		req.body

		User.findById(userId, (err, user) => {
			if (err) return res.status(500).json({ success: false, message: 'There was a problem updating the user', err });
			if (user.password !== req.body.currentPassword) return res.status(401).json({ success: false, message: 'Password incorrect' });

			user.set({ name: req.body.newUsername });
			user.save((err, updatedUser) => {
				if (err) return res.status(400).json({ success: false, message: 'Error:', err });

				res.status(200).json({ success: true, user: updatedUser });
			});
		});
	},
	updatePassword: (req, res) => {
		let userId = req.params.userId;

		User.findById(userId, (err, user) => {
			if (err) res.status(500).json({ success: false, message: 'There was a problem updating the user' });
			console.log('old pass =>', user.password, 'user sent pass =>', req.body.currentPassword);
			if (user.password !== req.body.currentPassword) return res.status(401).json({ success: false, message: 'Password incorrect' });

			user.set({ password: req.body.newPassword });
			user.save((err, updatedUser) => {
				if (err) return res.status(400).json({ success: false, message: 'Error:', err });

				res.status(200).json({ success: true, user: updatedUser });
			});
		});
	}
}