const express = require('express');

const router = express.Router();
// home page controller
const home_controller = require('../controller/home_controller');

router.use('/', home_controller.home);

module.exports = router;