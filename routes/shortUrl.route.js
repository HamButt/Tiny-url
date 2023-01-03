const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser').urlencoded({extended: false});
const shortUrlCtrl = require('../controllers/shortUrl.controller')


router.get('/:shortUrl', bodyParser, shortUrlCtrl.shortUrlVerification);

module.exports = router