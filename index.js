// start of placement cell website
// import express
const express = require('express');

// creating express app
const app = express();

// defining port
const port = 1001;

// import mongoose
const mongoose = require('./config/mongoose');

// import cookie-parser
const cookieParser = require('cookie-parser');
// using for create session 
// import session package
const session = require('express-session');

// mongo store to store cookie persistantly require express session to store the data of session
const mongoStore = require('connect-mongo');

// import express-ejs-layouts package
const expressLayout = require('express-ejs-layouts');


// import passport
const passport = require('passport');
// import passport local
const passportLocal = require('./config/passport_local_strategy');

// using cookie parser
app.use(cookieParser());

// for getting the post request
app.use(express.urlencoded());

// using static file
app.use(express.static(__dirname+'/assets')); 

// using layout before to routes
app.use(expressLayout);

// use style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up of view engine
app.set('view engine','ejs');
app.set('views','./views');

// session cookie bana rhea hai
app.use(session({
    name: 'codeial',
    // this for encrytion abhi random text use kiya hai after change the screet before deployment in production mode
    secret: 'blasomething',

    saveUninitialized: false,
    resave: false,
    // age of cookie
    cookie: {
        maxAge: (1000 * 60 * 10000)
    },

    store: mongoStore.create(
        {
            mongoUrl:"mongodb://127.0.0.1:27017/Placement",
            autoRemove: 'disabled'
        },
        (err)=>{
            console.log(err || 'connect-mongo-setup');
        }
    )
}));

// passport initialization
app.use(passport.initialize());
// middleware that store login state from a session
app.use(passport.session());
// this function goes to passport_local_strategy and check is session cookie is established or not ?
app.use(passport.setAuthenticatedUser);

// using router
app.use('/', require('./router'));

// listening on port
app.listen(port, (err)=>{
    if(err){
        console.log('error in listening');
    }
    console.log(`sun liya on ${port}`);
})