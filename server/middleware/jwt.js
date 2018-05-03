require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
	createToken: (req, res, next) => {

		const userId = req.body.user._id;

		jwt.sign({ user: { _id: userId } }, JWT_SECRET_KEY, { expiresIn: 43200 }, (err, token) => {

			if (err) return res.status(409).json({ auth: false, message: 'Error with jwt token.', err });

			return res.status(201).json({ auth: true, token: token });
		});
	},
	authenticateToken: (req, res, next) => {

		const token = req.params.tokenId;

		if (!token) return res.status(404).json({ auth: false, message: 'No token was given.' });

		jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {

			if (err) return res.status(401).json({ auth: false, message: 'Error with jwt token.', err });

			req.body.user = decoded.user;
			next();
		});
	},
}