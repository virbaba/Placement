const express = require('express');

const router = express.Router();
// placement manager controller controller
const placement_manager_controller = require('../controller/placement_manager_controller');

router.get('/manager', placement_manager_controller.placementManager);

module.exports = router;