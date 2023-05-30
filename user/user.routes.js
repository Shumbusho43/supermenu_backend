const express = require('express');
const signupController = require('./user.controller');
const loginController = require('./user.controller');

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
