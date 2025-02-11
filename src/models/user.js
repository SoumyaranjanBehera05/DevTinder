const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:8,
        maxLength:40
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is ot valid");
            }
        },
    },
    about: {
        type: String,
        default: "Hey there! I am using devTinder"
    },
    skills:{
        type:[String],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);