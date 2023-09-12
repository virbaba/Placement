// start of placement cell website
// import express
const express = require('express');

// creating express app
const app = express();

// defining port
const port = 1001;


// set up of view engine
app.set('view engine','ejs');
app.set('views','./views');

// using router
app.use('/', require('./router'));

// listening on port
app.listen(port, (err)=>{
    if(err){
        console.log('error in listening');
    }
    console.log(`sun liya on ${port}`);
})