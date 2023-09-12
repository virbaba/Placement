const passport = require('passport');


const localStrategy = require('passport-local').Strategy;
// in the local strategy of passport.js user is auth by username and password

const User = require('../models/user');

let validBy = {
    usernameField: 'email',
    passReqToCallback: true
}
passport.use(new localStrategy(validBy,
async function(req, email, password, done){
    // find a user and establish the identity
    try{
        let user = await User.findOne({email: email});

            if (!user || user.password != password){
                return done(null, false);
            }

            return done(null, user);
    }catch(err){
        console.log("error in signin",err);
    }
}


));

// Serialize the user to decide which key is kept into the cookie
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// De-Serialize the user from the key in the cookie
passport.deserializeUser(async (id, done)=>{
    try{
        const user = await User.findById(id);
       return done(null, user);
    }catch(err){
        console.log("error in deserialize",err);
    }

});

// check if the user autheticated
passport.checkAuthentication = (req, res, next)=>{
    // if the user singned in then pass the request to the next function that is my controller
    if(req.isAuthenticated()){
        return next();
    }

    // if the user not signed in
    return res.redirect('/users/sign_in');
}

// set the authenticated user to the views
passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        // req.user contain the current signned user from the session cookie and we are just sending to the user for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;