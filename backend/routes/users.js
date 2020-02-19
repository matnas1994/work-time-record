const express = require('express');
const {check} = require('express-validator');

const usersControllers = require('../controllers/users');

const router = express.Router();

router.post('/signup',[
    check('email').isEmail(),
    check('password').isLength({min: 6})
], usersControllers.signup);
router.post('/login', usersControllers.login);

module.exports = router;
