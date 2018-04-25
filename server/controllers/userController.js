require('dotenv').config();
const User = require('../models/User');

const JWT_SECRET_KEY = process.env.SECRET_KEY;

module.exports = {

	userLogin: (req, res, next) => {
		console.log('userLogin');
		let name = req.body.name;
		let password = req.body.password;
		console.log(`userLogin - POST name: ${ name }, pass: ${ password }`);
		User.findOne({ name: name }, (err, user) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ auth: false, message: 'There was a problem with the server.', errMsg: err });
			}
			if (!user) {
				console.log('userLogin - User doesnt exist!');
				return res.status(404).json({ auth: false, message: 'User doesn\'t exist.', errMsg: err });
			}
			if (password !== user.password) {
				console.log('userLogin - Wrong password!');
				return res.status(401).json({ auth: false, message: 'Incorrect password.', errMsg: err });
			}
			req.body.user = user;
			next();
		});
	},
	userCreate: (req, res, next) => {
		console.log('userCreate');
		console.log(req.body);

		let newUser = new User({
			name: req.body.name,
			password: req.body.password,
		});

		// console.log(newUser);

		newUser.save((err, user) => {
			if (err) return res.status(409).json({ auth: false, message: 'Username already in use.', errMsg: err });
			if (!user) return res.status(409).json({ auth: false, message: 'No user to save.' });

			console.log(`userController - userCreate - ${ user }`);
			req.body.user = user;
			next();
		});
	},
	getUserProfile: (req, res, next) => {
		console.log('getUserProfile');
		//console.log(req.body.token);
		const userId = req.body.user._id;
		console.log(userId)
		User.findById(userId, (err, user) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ auth: false, message: 'There was a problem with the server.' });
			}
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
	updateUserProfile: (req, res) => {
		console.log('updateUserProfile');
		console.log(req.params.userid);
		let userId = req.params.userid;
		UserModel.findByIdAndUpdate(userId, req.body, { new: true }, (err, user) => {
			if (err) res.status(500).json('There was a problem updating the user');
			res.status(200).json(user);
		});
	}
}