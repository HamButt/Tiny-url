const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser').urlencoded({extended: false});
const urlCtrl = require('../controllers/longUrl.controller')


router.post('/api', bodyParser, urlCtrl.createUrl);



module.exports = router