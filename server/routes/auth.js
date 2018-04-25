const jwtMiddleware = require('../middleware/jwt');
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/authenticate', jwtMiddleware.authenticateToken, userController.getUserProfile);

module.exports = router;