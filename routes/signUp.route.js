const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser').urlencoded({extended: false});
const userCtrl = require('../controllers/signUp.controller')


router.post('/', bodyParser, userCtrl.createUser);


module.exports = router