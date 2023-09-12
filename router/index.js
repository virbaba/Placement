const express = require('express');

const router = express.Router();
// home page controller
const home_controller = require('../controller/home_controller');

router.get('/', home_controller.home);
router.use('/user', require('./user'));

module.exports = router;