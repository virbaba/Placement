// import mongoose
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://virbaba:1234@cluster0.wtn8e8t.mongodb.net/?retryWrites=true&w=majority`);

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