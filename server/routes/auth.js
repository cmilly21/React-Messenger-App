const jwtMiddleware = require('../middleware/jwt');
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/:tokenId', jwtMiddleware.authenticateToken, userController.getUserProfile);

module.exports = router;