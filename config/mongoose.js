const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'An error has occured while connecting to the database'));
db.once('open', function(){
    console.log("The server is successfully connected to the database.")
});