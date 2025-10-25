const express = require('express');
const mainController = require('../controller/maincontroller')
const router = express.Router();

router.get('/home', mainControllert.home);
router.get('/about', mainController.about);

module.exports = router;