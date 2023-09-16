// import mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Placement");

// The default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error coming in database"));

db.once('open', (err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log('connect to database successfully 😊😊😊');
})

module.exports = db;