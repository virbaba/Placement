const express = require('express');

const router = express.Router();
// home page controller
const placement_manager_controller = require('../controller/placement_manager_controller');

router.get('/', placement_manager_controller.placementManager);
router.use('/users', require('./user'));
router.use('/placement', require('./placement'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interview'));

module.exports = router;