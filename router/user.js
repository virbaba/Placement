const express = require('express');

const router = express.Router();
// home page controller
const home_controller = require('../controller/user_controller');

router.get('/sign_up', home_controller.signUp);

module.exports = router;