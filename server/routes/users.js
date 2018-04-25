const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwt');
const userController = require('../controllers/userController');

router.post('/login', userController.userLogin, jwtMiddleware.createToken);
router.post('/signup', userController.userCreate, jwtMiddleware.createToken);
router.put('/:userid', userController.updateUserProfile);

module.exports = router;