const express = require('express');
const {signupController ,loginController}= require('./user.controller');
const router = express.Router();

router.post('/login', loginController);
router.post('/register', signupController);
module.exports = router;
