require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {

	createToken: (req, res, next) => {
		console.log('createToken');
		const userId = req.body.user._id;
		console.log(req.body);
		// 24-hours = 86400 || 24h
		// 12-hours = 43200 || 12h
		jwt.sign({ user: { _id: userId } }, JWT_SECRET_KEY, { expiresIn: 43200 }, (err, token) => {
			if (err) return res.status(409).json({ auth: false, message: 'Error with jwt token' });
			return res.status(201).json({ auth: true, token: token });
		});
	},
	authenticateToken: (req, res, next) => {
		console.log('authenticateToken');
		token = req.body.token;
		if (!token) return res.status(404).json({ auth: false, message: 'No token was given.' });
		jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				console.log(err.message);
				return res.status(401).json({ auth: false, message: 'Error with jwt token.' + err });
			}
			console.log(`decoded token`);
			req.body.user = decoded.user;

			next();
		});
	},
}