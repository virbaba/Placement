const express = require('express');

const router = express.Router();
// home page controller
const user_controller = require('../controller/user_controller');

router.get('/', user_controller.signUp);
router.use('/users', require('./user'));
router.use('/placement', require('./placement'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interview'));

module.exports = router;