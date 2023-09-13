const express = require('express');
const passport = require('passport');

const router = express.Router();
// home page controller
const userController = require('../controller/user_controller');

// router for sing up
router.get('/sign_up', userController.signUp);
// router for sing in
router.get('/sign_in', userController.signIn);
// router for create user
router.post('/create', userController.create);
// router for create session cookie
router.post('/create_session', passport.authenticate(
    // we use local here because strategy is local of passport
    'local',
    {failureRedirect:"/users/sign_in"}
), userController.createSession);
// router for sing out
router.get('/sign_out', userController.signOut);


module.exports = router;