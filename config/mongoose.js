const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/users');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'ERROR connecting to DB'));
db.once('open' , function(){
    console.log('Connected to Mongoose Database SUCEESSFULLY!!')
});