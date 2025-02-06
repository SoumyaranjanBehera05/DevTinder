const mongoose = require('mongoose');

const connectDB = async () => { 
    await mongoose.connect(
        'mongodb+srv://soumya:dbUserPassword@test-db.qzyfu.mongodb.net/?retryWrites=true&w=majority&appName=test-db/devTinder'
        );
    };

module.exports =connectDB;
